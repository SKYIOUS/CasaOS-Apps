import React, { useState, useEffect } from 'react';

export const AdvancedTools = ({ toolId }) => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');

    const parseJwt = () => {
        try {
            const parts = input.split('.');
            if (parts.length !== 3) throw new Error('Invalid JWT structure');
            const header = JSON.parse(atob(parts[0]));
            const payload = JSON.parse(atob(parts[1]));
            setOutput(JSON.stringify({ header, payload }, null, 2));
            setError('');
        } catch (e) {
            setError('JWT Error: ' + e.message);
            setOutput('');
        }
    };

    const parseUrl = () => {
        try {
            const url = new URL(input);
            const params = Object.fromEntries(new URLSearchParams(url.search));
            const res = {
                protocol: url.protocol,
                host: url.host,
                pathname: url.pathname,
                params: params,
                hash: url.hash
            };
            setOutput(JSON.stringify(res, null, 2));
            setError('');
        } catch (e) {
            setError('URL Error: ' + e.message);
            setOutput('');
        }
    };

    return (
        <div className="tool-content">
            <textarea
                placeholder={toolId === 'jwt-decoder' ? 'Paste JWT here...' : 'Paste URL here...'}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={5}
            />
            <button className="btn" onClick={toolId === 'jwt-decoder' ? parseJwt : parseUrl} style={{ marginTop: '1rem' }}>
                {toolId === 'jwt-decoder' ? 'Decode JWT' : 'Parse URL'}
            </button>

            {error && <div className="result-area" style={{ color: '#f87171' }}>{error}</div>}
            {output && (
                <div className="result-area">
                    <pre>{output}</pre>
                    <button className="btn btn-sm" onClick={() => navigator.clipboard.writeText(output)} style={{ marginTop: '0.5rem' }}>Copy JSON</button>
                </div>
            )}
        </div>
    );
};

export const Pomodoro = () => {
    const [time, setTime] = useState(1500);
    const [active, setActive] = useState(false);
    const [type, setType] = useState('work');

    useEffect(() => {
        let interval;
        if (active && time > 0) {
            interval = setInterval(() => setTime(prev => prev - 1), 1000);
        } else if (time === 0) {
            setActive(false);
            const sound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
            sound.play().catch(() => alert('Time is up!'));
        }
        return () => clearInterval(interval);
    }, [active, time]);

    const setTimer = (mins, mode) => {
        setTime(mins * 60);
        setType(mode);
        setActive(false);
    };

    const format = (s) => {
        const m = Math.floor(s / 60);
        const ss = s % 60;
        return `${m.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}`;
    };

    return (
        <div className="tool-content" style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <button className="btn btn-sm" style={{ background: type === 'work' ? 'var(--accent-color)' : 'rgba(255,255,255,0.05)' }} onClick={() => setTimer(25, 'work')}>Work</button>
                <button className="btn btn-sm" style={{ background: type === 'short' ? 'var(--accent-color)' : 'rgba(255,255,255,0.05)' }} onClick={() => setTimer(5, 'short')}>Short Break</button>
                <button className="btn btn-sm" style={{ background: type === 'long' ? 'var(--accent-color)' : 'rgba(255,255,255,0.05)' }} onClick={() => setTimer(15, 'long')}>Long Break</button>
            </div>

            <div style={{ fontSize: '6rem', fontWeight: '800', fontFamily: 'monospace', color: type === 'work' ? '#f87171' : '#4ade80' }}>
                {format(time)}
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
                <button className="btn" style={{ width: '150px' }} onClick={() => setActive(!active)}>{active ? 'Pause' : 'Start'}</button>
                <button className="btn btn-sm" onClick={() => setTimer(type === 'work' ? 25 : type === 'short' ? 5 : 15, type)}>Reset</button>
            </div>
        </div>
    );
};

export const Scratchpad = () => {
    const [content, setContent] = useState(localStorage.getItem('casahub_scratchpad') || '');

    useEffect(() => {
        localStorage.setItem('casahub_scratchpad', content);
    }, [content]);

    return (
        <div className="tool-content">
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Autosaves to local storage</div>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Type anything here... it will stay even if you close the app."
                style={{ height: '400px', fontSize: '1.1rem', lineHeight: '1.6' }}
            />
            <button className="btn btn-sm" style={{ background: '#f87171', marginTop: '0.5rem' }} onClick={() => setContent('')}>Clear Pad</button>
        </div>
    );
};
