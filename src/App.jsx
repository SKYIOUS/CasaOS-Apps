import React, { useState } from 'react';
import './App.css';

// Tool Components
const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);

  const generate = () => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let res = '';
    for (let i = 0; i < length; i++) {
      res += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(res);
  };

  return (
    <div className="tool-card">
      <div className="tool-icon">🔑</div>
      <h3 className="tool-title">Password Generator</h3>
      <p className="tool-description">Generate secure, random passwords instantly.</p>
      <div className="input-group">
        <label>Length: {length}</label>
        <input type="range" min="8" max="64" value={length} onChange={(e) => setLength(e.target.value)} />
      </div>
      <button className="btn" onClick={generate}>Generate</button>
      {password && <div className="result-area">{password}</div>}
    </div>
  );
};

const JsonFormatter = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const format = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError('');
    } catch (e) {
      setError('Invalid JSON');
      setOutput('');
    }
  };

  return (
    <div className="tool-card">
      <div className="tool-icon">{}</div>
      <h3 className="tool-title">JSON Formatter</h3>
      <p className="tool-description">Prettify and validate your JSON data.</p>
      <div className="input-group">
        <textarea 
          placeholder="Paste JSON here..." 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          rows={4}
        />
      </div>
      <button className="btn" onClick={format}>Format</button>
      {error && <div className="result-area" style={{color: '#ef4444'}}>{error}</div>}
      {output && <pre className="result-area">{output}</pre>}
    </div>
  );
};

const NetworkInfo = () => {
  const [ip, setIp] = useState('Click to fetch');
  
  const fetchIp = async () => {
    try {
      const res = await fetch('https://api.ipify.org?format=json');
      const data = await res.json();
      setIp(data.ip);
    } catch (e) {
      setIp('Error fetching IP');
    }
  };

  return (
    <div className="tool-card">
      <div className="tool-icon">🌐</div>
      <h3 className="tool-title">Network Info</h3>
      <p className="tool-description">Check your public IP and connection status.</p>
      <button className="btn" onClick={fetchIp}>Get My Public IP</button>
      <div className="result-area">{ip}</div>
    </div>
  );
};

const UnitConverter = () => {
  const [val, setVal] = useState(0);
  const [type, setType] = useState('c-f');
  
  const convert = () => {
    if (type === 'c-f') return (val * 9/5 + 32).toFixed(2) + ' °F';
    if (type === 'f-c') return ((val - 32) * 5/9).toFixed(2) + ' °C';
    if (type === 'km-mi') return (val * 0.621371).toFixed(2) + ' mi';
    if (type === 'mi-km') return (val / 0.621371).toFixed(2) + ' km';
    return val;
  };

  return (
    <div className="tool-card">
      <div className="tool-icon">⚖️</div>
      <h3 className="tool-title">Unit Converter</h3>
      <p className="tool-description">Quick conversions for common units.</p>
      <div className="input-group">
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="c-f">Celsius to Fahrenheit</option>
          <option value="f-c">Fahrenheit to Celsius</option>
          <option value="km-mi">Kilometers to Miles</option>
          <option value="mi-km">Miles to Kilometers</option>
        </select>
      </div>
      <div className="input-group">
        <input type="number" value={val} onChange={(e) => setVal(e.target.value)} />
      </div>
      <div className="result-area">Result: {convert()}</div>
    </div>
  );
};

const NotePad = () => {
  const [note, setNote] = useState(localStorage.getItem('casahub_note') || '');

  const saveNote = (val) => {
    setNote(val);
    localStorage.setItem('casahub_note', val);
  };

  return (
    <div className="tool-card">
      <div className="tool-icon">📝</div>
      <h3 className="tool-title">Scratchpad</h3>
      <p className="tool-description">A simple place to keep temporary notes.</p>
      <textarea 
        placeholder="Type something..." 
        value={note} 
        onChange={(e) => saveNote(e.target.value)}
        rows={8}
      />
      <div style={{fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem'}}>Auto-saves to local storage</div>
    </div>
  );
};

const Base64Tool = () => {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState('encode');

  const process = () => {
    try {
      return mode === 'encode' ? btoa(input) : atob(input);
    } catch (e) {
      return 'Invalid Input';
    }
  };

  return (
    <div className="tool-card">
      <div className="tool-icon">🔏</div>
      <h3 className="tool-title">Base64 Tool</h3>
      <p className="tool-description">Encode or decode Base64 strings.</p>
      <div className="input-group">
        <select value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="encode">Encode</option>
          <option value="decode">Decode</option>
        </select>
      </div>
      <input 
        type="text" 
        placeholder="Enter text..." 
        value={input} 
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="result-area">{process()}</div>
    </div>
  );
};

function App() {
  return (
    <>
      <aside className="sidebar">
        <div className="logo">
          <span>🏠</span>
          CasaHub
        </div>
        <nav className="nav-links">
          <div className="nav-item active">Dashboard</div>
          <div className="nav-item">Settings</div>
          <div className="nav-item">About</div>
        </nav>
      </aside>

      <main className="main-layout">
        <header className="header">
          <h1>Welcome to CasaHub</h1>
          <p>Your integrated suite of essential tools for CasaOS.</p>
        </header>

        <div className="tool-grid">
          <PasswordGenerator />
          <JsonFormatter />
          <NetworkInfo />
          <UnitConverter />
          <NotePad />
          <Base64Tool />
        </div>
      </main>
    </>
  );
}

export default App;
