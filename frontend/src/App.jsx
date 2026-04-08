import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import Navbar from './components/Navbar.jsx';
import DashboardPage from './components/DashboardPage.jsx';
import AboutPage from './components/AboutPage.jsx';
import ComponentsPage from './components/ComponentsPage.jsx';
import ContactPage from './components/ContactPage.jsx';

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

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showFlash, setShowFlash] = useState(true);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setShowFlash(false);
    }, 1400);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        setIsLoading(true);
        setError('');

        const response = await fetch('/api/data');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const result = await response.json();

        if (isMounted) {
          setData(Array.isArray(result) ? result : []);
        }
      } catch (fetchError) {
        if (isMounted) {
          setError(fetchError.message === 'Failed to fetch data' ? 'Unable to load transformer data' : 'Connection unavailable');
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
  }, []);

  useEffect(() => {
    const socket = io('/', {
      transports: ['websocket']
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
  }, []);

  const ActivePage = pageMap[activePage];

  return (
    <div className="app-shell">
      <div className={`landing-flash ${showFlash ? 'is-active' : 'is-hidden'}`} aria-hidden="true">
        <div className="storm-glow" />
        <svg className="thunder-overlay" viewBox="0 0 1440 900" preserveAspectRatio="none">
          <path
            className="thunder-bolt bolt-left"
            d="M220 0 L180 150 L250 150 L170 340 L260 340 L120 620 L200 620 L90 900"
          />
          <path
            className="thunder-bolt bolt-center"
            d="M760 0 L700 180 L790 180 L680 390 L810 390 L620 700 L730 700 L650 900"
          />
          <path
            className="thunder-bolt bolt-right"
            d="M1150 0 L1080 130 L1160 130 L1030 330 L1140 330 L970 610 L1060 610 L960 900"
          />
          <path
            className="thunder-branch branch-left"
            d="M735 280 L640 360 L700 390"
          />
          <path
            className="thunder-branch branch-center"
            d="M1110 250 L1195 330 L1135 370"
          />
          <path
            className="thunder-branch branch-right"
            d="M210 280 L300 360 L235 395"
          />
        </svg>
      </div>
      <Navbar items={pages} activePage={activePage} onNavigate={setActivePage} />
      <main className="page-shell">
        <div key={activePage} className="page-transition">
          {activePage === 'dashboard' ? (
            <DashboardPage data={data} isLoading={isLoading} error={error} />
          ) : (
            <ActivePage />
          )}
        </div>
      </main>
      <footer className="site-footer">MADE BY : VoltineX Team</footer>
    </div>
  );
}
