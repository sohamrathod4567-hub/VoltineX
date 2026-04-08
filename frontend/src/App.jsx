import { useEffect, useState } from 'react';

export default function App() {
  const [status, setStatus] = useState('Connecting...');

  useEffect(() => {
    fetch('/api/status')
      .then((response) => response.json())
      .then((data) => {
        if (data?.status) {
          setStatus('Backend connected');
        }
      })
      .catch(() => {
        setStatus('Backend unavailable');
      });
  }, []);

  return (
    <main className="app-shell">
      <div className="panel">
        <h1>VoltineX</h1>
        <p className="subtitle">React + Vite frontend connected to Express backend.</p>
        <div className="status">API status: {status}</div>
      </div>
    </main>
  );
}
