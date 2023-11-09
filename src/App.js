import React, { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api';

function App() {
  const [systemInfo, setSystemInfo] = useState({ cpu_usage: 0, memory_usage: 0, time: '' });

  useEffect(() => {
    async function fetchSystemInfo() {
      try {
        const info = await invoke('get_system_info');
        setSystemInfo(JSON.parse(info));
      } catch (e) {
        console.error('Failed to fetch system info', e);
      }
    }

    const intervalId = setInterval(fetchSystemInfo, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // ステータスバースタイル
  const statusBarStyle = {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    width: '100%', // 全幅
    height: '25px', // 高さ
    backgroundColor: '#1b1b1b', // 背景色
    color: '#ffffff', // テキストの色
    position: 'fixed',
    top: 0,
    left: 0,
    padding: '5px 10px',
    boxSizing: 'border-box',
    fontFamily: '"Roboto Mono", monospace', // フォント
    fontSize: '12px', // フォントサイズ
    zIndex: 9999, // 他の要素の上に表示
  };

  // 各情報表示用のスタイル
  const infoStyle = {
    display: 'flex',
    alignItems: 'center',
    marginRight: '20px', // 右側の余白
  };

  return (
    <div style={statusBarStyle}>
      <div style={infoStyle}>CPU: {systemInfo.cpu_usage.toFixed(2)}%</div>
      <div style={infoStyle}>RAM: {systemInfo.memory_usage.toFixed(2)}%</div>
      <div style={infoStyle}>Time: {systemInfo.time}</div>
    </div>
  );
}

export default App;

