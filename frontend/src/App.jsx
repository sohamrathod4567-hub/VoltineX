import { useState } from 'react';
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
  const ActivePage = pageMap[activePage];

  return (
    <div className="app-shell">
      <Navbar items={pages} activePage={activePage} onNavigate={setActivePage} />
      <main className="page-shell">
        <ActivePage />
      </main>
    </div>
  );
}
