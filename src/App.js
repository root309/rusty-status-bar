import React, { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api';

function App() {
  const [systemInfo, setSystemInfo] = useState('');

  useEffect(() => {
    async function fetchSystemInfo() {
      try {
        const info = await invoke('get_system_info');
        setSystemInfo(info);
      } catch (e) {
        console.error('Failed to fetch system info', e);
      }
    }

    fetchSystemInfo();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>System Info: {systemInfo}</p>
      </header>
    </div>
  );
}

export default App;

