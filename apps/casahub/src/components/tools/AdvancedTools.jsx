import React, { useState, useEffect } from 'react';

export const AdvancedTools = () => {
    const [input, setInput] = useState('');
    const [tool, setTool] = useState('jwt');

    const decodeJwt = () => {
        try {
            const parts = input.split('.');
            if (parts.length !== 3) return 'Invalid JWT format';
            const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
            return JSON.stringify(payload, null, 2);
        } catch (e) {
            return 'Error decoding JWT';
        }
    };

    const parseUrl = () => {
        try {
            const url = new URL(input);
            return JSON.stringify({
                protocol: url.protocol,
                host: url.host,
                pathname: url.pathname,
                search: url.search,
                params: Object.fromEntries(url.searchParams),
                hash: url.hash
            }, null, 2);
        } catch (e) {
            return 'Invalid URL';
        }
    };

    return (
        <div className="tool-content">
            <div className="input-group">
                <select value={tool} onChange={(e) => setTool(e.target.value)}>
                    <option value="jwt">JWT Decoder</option>
                    <option value="url">URL Parser</option>
                </select>
            </div>
            <textarea
                placeholder={tool === 'jwt' ? 'Paste JWT here...' : 'Paste URL here...'}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={6}
            />
            <div className="result-area">
                <pre>{tool === 'jwt' ? decodeJwt() : parseUrl()}</pre>
            </div>
        </div>
    );
};

export const Pomodoro = () => {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [mode, setMode] = useState('work');
    const [active, setActive] = useState(false);

    useEffect(() => {
        let timer;
        if (active && timeLeft > 0) {
            timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
        } else if (timeLeft === 0) {
            setActive(false);
            const nextMode = mode === 'work' ? 'break' : 'work';
            setMode(nextMode);
            setTimeLeft(nextMode === 'work' ? 25 * 60 : 5 * 60);
            alert(`Time for a ${nextMode}!`);
        }
        return () => clearInterval(timer);
    }, [active, timeLeft, mode]);

    const format = (s) => {
        const m = Math.floor(s / 60);
        const rs = s % 60;
        return `${m}:${rs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="tool-content" style={{ textAlign: 'center' }}>
            <div style={{ color: mode === 'work' ? '#ef4444' : '#10b981', fontWeight: 'bold', textTransform: 'uppercase' }}>{mode} MODE</div>
            <div style={{ fontSize: '3.5rem', fontWeight: '800', margin: '1rem 0' }}>{format(timeLeft)}</div>
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                <button className="btn" onClick={() => setActive(!active)}>{active ? 'Pause' : 'Start'}</button>
                <button className="btn btn-sm" onClick={() => { setActive(false); setTimeLeft(25 * 60); setMode('work'); }}>Reset</button>
            </div>
        </div>
    );
};

export const Scratchpad = () => {
    const [note, setNote] = useState(localStorage.getItem('casahub_note') || '');

    const save = (val) => {
        setNote(val);
        localStorage.setItem('casahub_note', val);
    };

    return (
        <div className="tool-content">
            <textarea
                placeholder="A persistent scratchpad..."
                value={note}
                onChange={(e) => save(e.target.value)}
                rows={10}
            />
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Auto-saves to local storage</div>
        </div>
    );
};
