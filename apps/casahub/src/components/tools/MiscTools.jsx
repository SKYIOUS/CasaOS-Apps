import React, { useState, useEffect } from 'react';

export const Base64Tool = () => {
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
        <div className="tool-content">
            <div className="input-group">
                <select value={mode} onChange={(e) => setMode(e.target.value)}>
                    <option value="encode">Encode</option>
                    <option value="decode">Decode</option>
                </select>
            </div>
            <textarea placeholder="Enter text..." value={input} onChange={(e) => setInput(e.target.value)} rows={4} />
            <div className="result-area">{process()}</div>
        </div>
    );
};

export const RegexTester = () => {
    const [regex, setRegex] = useState('');
    const [flags, setFlags] = useState('g');
    const [text, setText] = useState('');

    const getResults = () => {
        try {
            if (!regex) return 'Enter a regex pattern';
            const re = new RegExp(regex, flags);
            const matches = text.match(re);
            return matches ? `Found ${matches.length} matches: \n${matches.join(', ')}` : 'No matches found';
        } catch (e) {
            return `Error: ${e.message}`;
        }
    };

    return (
        <div className="tool-content">
            <input type="text" placeholder="Regex pattern (e.g. [a-z]+)" value={regex} onChange={(e) => setRegex(e.target.value)} />
            <input type="text" placeholder="Flags (e.g. gi)" value={flags} onChange={(e) => setFlags(e.target.value)} style={{ marginTop: '0.5rem', width: '30%' }} />
            <textarea placeholder="Test text..." value={text} onChange={(e) => setText(e.target.value)} rows={4} style={{ marginTop: '1rem' }} />
            <div className="result-area">{getResults()}</div>
        </div>
    );
};

export const UUIDGenerator = () => {
    const [uuid, setUuid] = useState('');

    const generate = () => {
        setUuid(crypto.randomUUID());
    };

    return (
        <div className="tool-content">
            <button className="btn" onClick={generate}>Generate UUID v4</button>
            {uuid && <div className="result-area"><code>{uuid}</code></div>}
        </div>
    );
};

export const Stopwatch = () => {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);

    useEffect(() => {
        let interval;
        if (running) {
            interval = setInterval(() => setTime(prev => prev + 10), 10);
        }
        return () => clearInterval(interval);
    }, [running]);

    const formatTime = (ms) => {
        const min = Math.floor(ms / 60000).toString().padStart(2, '0');
        const sec = Math.floor((ms % 60000) / 1000).toString().padStart(2, '0');
        const cent = Math.floor((ms % 1000) / 10).toString().padStart(2, '0');
        return `${min}:${sec}.${cent}`;
    };

    return (
        <div className="tool-content" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', fontWeight: '800', margin: '1.5rem 0' }}>{formatTime(time)}</div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn" onClick={() => setRunning(!running)}>{running ? 'Pause' : 'Start'}</button>
                <button className="btn btn-sm" onClick={() => { setTime(0); setRunning(false); }}>Reset</button>
            </div>
        </div>
    );
};

export const ColorPicker = () => {
    const [color, setColor] = useState('#4f46e5');

    return (
        <div className="tool-content">
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <input type="color" value={color} onChange={(e) => setColor(e.target.value)} style={{ width: '80px', height: '80px', padding: 0 }} />
                <div style={{ flex: 1 }}>
                    <div className="result-area" style={{ background: color, color: '#fff', border: 'none', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>HEX: {color.toUpperCase()}</div>
                    <button className="btn btn-sm" onClick={() => navigator.clipboard.writeText(color)} style={{ marginTop: '0.5rem' }}>Copy Hex</button>
                </div>
            </div>
        </div>
    );
};
