import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import { TOOLS, CATEGORIES } from './data/tools';
import ToolRenderer from './components/ToolRenderer';

// Components
const Sidebar = ({ activeTab, setActiveTab, activeCategory, setActiveCategory, searchQuery, setSearchQuery }) => {
  return (
    <aside className="sidebar">
      <div className="logo" onClick={() => setActiveTab('dashboard')} style={{ cursor: 'pointer' }}>
        <span>🏠</span>
        CasaHub
      </div>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search tools..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <nav className="nav-links">
        <div className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
          Dashboard
        </div>
        <div className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
          Settings
        </div>
        <div className={`nav-item ${activeTab === 'about' ? 'active' : ''}`} onClick={() => setActiveTab('about')}>
          About
        </div>
      </nav>

      <div className="category-list">
        <div style={{ padding: '0 1rem', fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Categories</div>
        {CATEGORIES.map(cat => (
          <div
            key={cat.id}
            className={`category-item ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => {
              setActiveCategory(cat.id);
              setActiveTab('dashboard');
            }}
          >
            <span>{cat.icon}</span>
            {cat.name}
          </div>
        ))}
      </div>
    </aside>
  );
};

const Settings = () => {
  const [darkTheme, setDarkTheme] = useState(true);
  const [animations, setAnimations] = useState(true);

  return (
    <div className="view-container" style={{ animation: 'fadeIn 0.5s ease' }}>
      <header className="header">
        <h1>Settings</h1>
        <p>Customize your CasaHub experience.</p>
      </header>

      <div className="settings-group">
        <h3>Appearance</h3>
        <div className="settings-item">
          <div className="settings-label">
            <h4>Dark Mode</h4>
            <p>Use a darker color palette for the interface.</p>
          </div>
          <label className="switch">
            <input type="checkbox" checked={darkTheme} onChange={() => setDarkTheme(!darkTheme)} />
            <span className="slider"></span>
          </label>
        </div>
        <div className="settings-item">
          <div className="settings-label">
            <h4>Smooth Animations</h4>
            <p>Enable transitions and fade-in effects.</p>
          </div>
          <label className="switch">
            <input type="checkbox" checked={animations} onChange={() => setAnimations(!animations)} />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      <div className="settings-group">
        <h3>Preferences</h3>
        <div className="settings-item">
          <div className="settings-label">
            <h4>Default Category</h4>
            <p>Page to show when the app starts.</p>
          </div>
          <select className="search-input" style={{ width: 'auto' }}>
            {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
};

const About = () => {
  return (
    <div className="view-container" style={{ animation: 'fadeIn 0.5s ease' }}>
      <div className="about-hero">
        <div className="about-logo">🏠</div>
        <h1>CasaHub</h1>
        <p>The Ultimate Utility Suite for CasaOS</p>
        <span className="about-version">v1.1.0-beta</span>
      </div>

      <div className="settings-group">
        <h3>What is CasaHub?</h3>
        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
          CasaHub centralizes essential tools for your digital workspace into a high-performance web interface. Designed for CasaOS to eliminate dashboard clutter.
        </p>
      </div>

      <div className="about-links">
        <a href="https://github.com/SKYIOUS/CasaOS-Apps" target="_blank" rel="noopener noreferrer" className="about-link-card">
          <span>📦</span>
          <h4>GitHub Repo</h4>
          <p>Source code & issues</p>
        </a>
        <a href="https://casaos.io" target="_blank" rel="noopener noreferrer" className="about-link-card">
          <span>🐳</span>
          <h4>CasaOS</h4>
          <p>Learn more about CasaOS</p>
        </a>
      </div>
    </div>
  );
};

const ToolCard = ({ tool, onLaunch }) => {
  return (
    <div className="tool-card">
      <div className="tool-icon">{tool.icon}</div>
      <h3 className="tool-title">{tool.title}</h3>
      <p className="tool-description">{tool.description}</p>
      <div className="input-group">
        <button className="btn" onClick={() => onLaunch(tool)}>Launch Tool</button>
      </div>
      <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '0.5rem', textAlign: 'center', textTransform: 'uppercase' }}>
        {tool.category}
      </div>
    </div>
  );
};

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTool, setSelectedTool] = useState(null);

  const filteredTools = useMemo(() => {
    return TOOLS.filter(tool => {
      const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
      const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Handle closing tool with Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setSelectedTool(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <>
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main className="main-layout">
        {activeTab === 'dashboard' && !selectedTool && (
          <div style={{ animation: 'fadeIn 0.5s ease' }}>
            <header className="header">
              <h1>{activeCategory === 'all' ? 'Dashboard' : CATEGORIES.find(c => c.id === activeCategory)?.name}</h1>
              <p>Explore {filteredTools.length} tools for your next project.</p>
            </header>

            <div className="tool-grid">
              {filteredTools.length > 0 ? (
                filteredTools.map(tool => (
                  <ToolCard key={tool.id} tool={tool} onLaunch={setSelectedTool} />
                ))
              ) : (
                <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '5rem', color: 'var(--text-secondary)' }}>
                  <h3>No tools found matching "{searchQuery}"</h3>
                </div>
              )}
            </div>
          </div>
        )}

        {selectedTool && (
          <div className="view-container" style={{ animation: 'fadeIn 0.4s ease' }}>
            <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button className="btn" onClick={() => setSelectedTool(null)} style={{ width: 'auto', background: 'rgba(255,255,255,0.1)' }}>← Back</button>
              <div style={{ fontSize: '1.5rem' }}>{selectedTool.icon}</div>
              <h2 style={{ margin: 0 }}>{selectedTool.title}</h2>
            </div>

            <div className="settings-group" style={{ padding: '2.5rem' }}>
              <ToolRenderer toolId={selectedTool.id} />
            </div>
          </div>
        )}

        {activeTab === 'settings' && <Settings />}
        {activeTab === 'about' && <About />}
      </main>
    </>
  );
}

export default App;
