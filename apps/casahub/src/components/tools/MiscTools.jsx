import React, { useState, useEffect } from 'react';

export const Base64Tool = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState('encode');

    const process = () => {
        try {
            if (mode === 'encode') {
                const encoded = btoa(unescape(encodeURIComponent(input)));
                setOutput(encoded);
            } else {
                const decoded = decodeURIComponent(escape(atob(input)));
                setOutput(decoded);
            }
        } catch (e) {
            setOutput('Error: Invalid input for ' + mode);
        }
    };

    return (
        <div className="tool-content">
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                <button className={`btn ${mode === 'encode' ? '' : 'btn-sm'}`}
                    style={{ background: mode === 'encode' ? 'var(--accent-color)' : 'rgba(255,255,255,0.05)' }}
                    onClick={() => setMode('encode')}>Encode</button>
                <button className={`btn ${mode === 'decode' ? '' : 'btn-sm'}`}
                    style={{ background: mode === 'decode' ? 'var(--accent-color)' : 'rgba(255,255,255,0.05)' }}
                    onClick={() => setMode('decode')}>Decode</button>
            </div>
            <textarea
                placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter base64 to decode...'}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={6}
            />
            <button className="btn" style={{ marginTop: '1rem' }} onClick={process}>Process Base64</button>
            {output && (
                <div className="result-area">
                    <pre>{output}</pre>
                    <button className="btn btn-sm" onClick={() => navigator.clipboard.writeText(output)} style={{ marginTop: '0.5rem' }}>Copy Output</button>
                </div>
            )}
        </div>
    );
};

export const RegexTester = () => {
    const [regex, setRegex] = useState('');
    const [flags, setFlags] = useState('g');
    const [text, setText] = useState('');
    const [matches, setMatches] = useState([]);
    const [error, setError] = useState('');

    const test = () => {
        if (!regex) return;
        try {
            const re = new RegExp(regex, flags);
            const m = [...text.matchAll(re)];
            setMatches(m);
            setError('');
        } catch (e) {
            setError(e.message);
            setMatches([]);
        }
    };

    useEffect(test, [regex, flags, text]);

    return (
        <div className="tool-content">
            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>REGEX</label>
                    <input value={regex} onChange={(e) => setRegex(e.target.value)} placeholder="^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$" />
                </div>
                <div style={{ width: '80px' }}>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>FLAGS</label>
                    <input value={flags} onChange={(e) => setFlags(e.target.value)} placeholder="gi" />
                </div>
            </div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>TEST TEXT</label>
            <textarea value={text} onChange={(e) => setText(e.target.value)} rows={4} placeholder="Paste text here to test matches..." />

            {error && <div className="result-area" style={{ color: '#f87171' }}>{error}</div>}

            <div className="result-area">
                <strong>{matches.length} Matches found</strong>
                <div style={{ marginTop: '0.5rem', maxHeight: '200px', overflow: 'auto' }}>
                    {matches.map((m, i) => (
                        <div key={i} style={{ padding: '0.25rem 0', borderBottom: '1px solid var(--border-color)', fontSize: '0.9rem' }}>
                            <span style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>Match {i + 1}: </span>
                            <code>{m[0]}</code>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export const UUIDGenerator = () => {
    const [uuids, setUuids] = useState([]);
    const [count, setCount] = useState(5);

    const generate = () => {
        const newUuids = Array(Number(count)).fill(0).map(() => crypto.randomUUID());
        setUuids(newUuids);
    };

    return (
        <div className="tool-content">
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <label>Quantity:</label>
                <input type="number" min="1" max="100" value={count} onChange={(e) => setCount(e.target.value)} style={{ width: '100px' }} />
                <button className="btn" onClick={generate}>Generate UUIDs</button>
            </div>
            {uuids.length > 0 && (
                <div className="result-area">
                    {uuids.map((u, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <code>{u}</code>
                            <button className="btn btn-sm" style={{ padding: '2px 8px' }} onClick={() => navigator.clipboard.writeText(u)}>Copy</button>
                        </div>
                    ))}
                    <button className="btn" onClick={() => navigator.clipboard.writeText(uuids.join('\n'))} style={{ marginTop: '1rem' }}>Copy All</button>
                </div>
            )}
        </div>
    );
};

export const Stopwatch = () => {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const [laps, setLaps] = useState([]);

    useEffect(() => {
        let interval;
        if (running) {
            interval = setInterval(() => setTime(prev => prev + 10), 10);
        }
        return () => clearInterval(interval);
    }, [running]);

    const formatTime = (ms) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        const centiseconds = Math.floor((ms % 1000) / 10);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
    };

    const addLap = () => {
        setLaps(prev => [formatTime(time), ...prev]);
    };

    return (
        <div className="tool-content" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', fontWeight: '800', margin: '2rem 0', fontFamily: 'monospace', letterSpacing: '2px' }}>
                {formatTime(time)}
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button className="btn" style={{ background: running ? '#f87171' : 'var(--accent-color)' }} onClick={() => setRunning(!running)}>
                    {running ? 'Pause' : 'Start'}
                </button>
                <button className="btn" style={{ background: 'rgba(255,255,255,0.1)' }} onClick={addLap} disabled={!running && time === 0}>Lap</button>
                <button className="btn" style={{ background: 'rgba(255,255,255,0.1)' }} onClick={() => { setTime(0); setRunning(false); setLaps([]); }}>Reset</button>
            </div>
            {laps.length > 0 && (
                <div className="result-area" style={{ textAlign: 'left', marginTop: '2rem' }}>
                    <strong>Laps:</strong>
                    <div style={{ maxHeight: '150px', overflow: 'auto', marginTop: '0.5rem' }}>
                        {laps.map((l, i) => (
                            <div key={i} style={{ padding: '0.3rem 0', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between' }}>
                                <span>Lap {laps.length - i}</span>
                                <code>{l}</code>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export const ColorPicker = () => {
    const [color, setColor] = useState('#4f46e5');

    const hexToRgb = (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '0, 0, 0';
    };

    return (
        <div className="tool-content">
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    style={{ width: '150px', height: '150px', padding: 0, border: 'none', background: 'transparent', cursor: 'pointer' }}
                />
                <div style={{ flex: 1, minWidth: '200px' }}>
                    <div className="settings-group" style={{ padding: '1.5rem', margin: 0 }}>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>HEX</label>
                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                <code style={{ fontSize: '1.2rem', flex: 1 }}>{color.toUpperCase()}</code>
                                <button className="btn btn-sm" onClick={() => navigator.clipboard.writeText(color.toUpperCase())}>Copy</button>
                            </div>
                        </div>
                        <div>
                            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>RGB</label>
                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                <code style={{ fontSize: '1.2rem', flex: 1 }}>rgb({hexToRgb(color)})</code>
                                <button className="btn btn-sm" onClick={() => navigator.clipboard.writeText(`rgb(${hexToRgb(color)})`)}>Copy</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ marginTop: '2rem', padding: '2rem', borderRadius: '15px', background: color, textAlign: 'center', color: '#fff', textShadow: '0 2px 4px rgba(0,0,0,0.3)', fontWeight: 'bold' }}>
                Live Preview
            </div>
        </div>
    );
};
