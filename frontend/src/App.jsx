import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import Navbar from './components/Navbar.jsx';
import DashboardPage from './components/DashboardPage.jsx';
import AboutPage from './components/AboutPage.jsx';
import ComponentsPage from './components/ComponentsPage.jsx';
import ContactPage from './components/ContactPage.jsx';

const storageKey = 'voltinex-auth';

const pages = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'about', label: 'About' },
  { id: 'components', label: 'Components' },
  { id: 'contact', label: 'Contact' }
];

const pageMap = {
  dashboard: DashboardPage,
  about: AboutPage,
  components: ComponentsPage,
  contact: ContactPage
};

function readStoredAuth() {
  const savedValue = localStorage.getItem(storageKey);

  if (!savedValue) {
    return { token: '', user: null };
  }

  try {
    const parsedValue = JSON.parse(savedValue);
    return {
      token: parsedValue.token || '',
      user: parsedValue.user || null
    };
  } catch (error) {
    return { token: '', user: null };
  }
}

function AuthPanel({ mode, form, error, onModeChange, onChange, onSubmit }) {
  return (
    <section className="auth-shell">
      <div className="auth-card">
        <span className="eyebrow">Authentication</span>
        <h1 className="section-title">Secure access for the VoltineX dashboard.</h1>
        <p className="section-copy">
          Sign in to view transformer data and realtime updates.
        </p>

        <div className="auth-switch">
          <button
            type="button"
            className={`nav-link ${mode === 'login' ? 'is-active' : ''}`}
            onClick={() => onModeChange('login')}
          >
            Login
          </button>
          <button
            type="button"
            className={`nav-link ${mode === 'signup' ? 'is-active' : ''}`}
            onClick={() => onModeChange('signup')}
          >
            Signup
          </button>
        </div>

        <form className="auth-form" onSubmit={onSubmit}>
          {mode === 'signup' ? (
            <div className="field">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" type="text" value={form.name} onChange={onChange} />
            </div>
          ) : null}

          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" value={form.email} onChange={onChange} />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" value={form.password} onChange={onChange} />
          </div>

          {error ? <p className="auth-error">{error}</p> : null}

          <button type="submit" className="primary-button">
            {mode === 'login' ? 'Login' : 'Create Account'}
          </button>
        </form>
      </div>
    </section>
  );
}

export default function App() {
  const storedAuth = readStoredAuth();
  const [activePage, setActivePage] = useState('dashboard');
  const [authMode, setAuthMode] = useState('login');
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '' });
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [token, setToken] = useState(storedAuth.token);
  const [user, setUser] = useState(storedAuth.user);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) {
      setData([]);
      setIsLoading(false);
      return undefined;
    }

    let isMounted = true;

    async function loadData() {
      try {
        setIsLoading(true);
        setError('');

        const response = await fetch('/api/data', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const result = await response.json();

        if (isMounted) {
          setData(Array.isArray(result) ? result : []);
        }
      } catch (fetchError) {
        if (isMounted) {
          if (fetchError.message === 'Failed to fetch data') {
            setError('Unable to load transformer data');
          } else {
            setError('Connection unavailable');
          }
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [token]);

  useEffect(() => {
    if (!token) {
      return undefined;
    }

    const socket = io('/', {
      transports: ['websocket'],
      auth: {
        token
      }
    });

    socket.on('newData', (record) => {
      setData((currentData) => {
        if (!record || typeof record !== 'object') {
          return currentData;
        }

        const nextData = [
          record,
          ...currentData.filter((item) => item?.timestamp !== record.timestamp)
        ];

        return nextData;
      });

      setIsLoading(false);
      setError('');
    });

    socket.on('connect_error', () => {
      setError((currentError) => currentError || 'Realtime connection unavailable');
    });

    return () => {
      socket.disconnect();
    };
  }, [token]);

  useEffect(() => {
    if (token && user) {
      localStorage.setItem(storageKey, JSON.stringify({ token, user }));
      return;
    }

    localStorage.removeItem(storageKey);
  }, [token, user]);

  async function handleAuthSubmit(event) {
    event.preventDefault();
    setAuthLoading(true);
    setAuthError('');

    try {
      const endpoint = authMode === 'login' ? '/api/auth/login' : '/api/auth/signup';
      const body =
        authMode === 'login'
          ? { email: authForm.email, password: authForm.password }
          : authForm;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Authentication failed');
      }

      setToken(result.token);
      setUser(result.user);
      setActivePage('dashboard');
      setAuthForm({ name: '', email: '', password: '' });
      setAuthError('');
    } catch (submitError) {
      setAuthError(submitError.message);
    } finally {
      setAuthLoading(false);
    }
  }

  function handleAuthChange(event) {
    const { name, value } = event.target;
    setAuthForm((currentForm) => ({ ...currentForm, [name]: value }));
  }

  function handleLogout() {
    setToken('');
    setUser(null);
    setData([]);
    setError('');
    setActivePage('about');
  }

  const ActivePage = pageMap[activePage];

  return (
    <div className="app-shell">
      {token ? (
        <Navbar
          items={pages}
          activePage={activePage}
          onNavigate={setActivePage}
          user={user}
          onLogout={handleLogout}
        />
      ) : null}
      <main className="page-shell">
        {!token ? (
          <AuthPanel
            mode={authMode}
            form={authForm}
            error={authError || (authLoading ? 'Processing request' : '')}
            onModeChange={setAuthMode}
            onChange={handleAuthChange}
            onSubmit={handleAuthSubmit}
          />
        ) : activePage === 'dashboard' ? (
          <DashboardPage data={data} isLoading={isLoading} error={error} />
        ) : (
          <ActivePage />
        )}
      </main>
    </div>
  );
}
