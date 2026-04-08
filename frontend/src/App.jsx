import { useEffect, useState } from 'react';
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
          setError('Unable to load transformer data');
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

  const ActivePage = pageMap[activePage];

  return (
    <div className="app-shell">
      <Navbar items={pages} activePage={activePage} onNavigate={setActivePage} />
      <main className="page-shell">
        {activePage === 'dashboard' ? (
          <DashboardPage data={data} isLoading={isLoading} error={error} />
        ) : (
          <ActivePage />
        )}
      </main>
    </div>
  );
}
