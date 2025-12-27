import React, { useState } from 'react';

export const PasswordGenerator = () => {
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
        <div className="tool-content">
            <div className="input-group">
                <label>Length: {length}</label>
                <input type="range" min="8" max="64" value={length} onChange={(e) => setLength(e.target.value)} />
            </div>
            <button className="btn" onClick={generate}>Generate Password</button>
            {password && (
                <div className="result-area">
                    <code>{password}</code>
                    <button className="btn btn-sm" onClick={() => navigator.clipboard.writeText(password)} style={{ marginTop: '0.5rem', width: 'auto' }}>Copy</button>
                </div>
            )}
        </div>
    );
};

export const JsonFormatter = () => {
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

    const minify = () => {
        try {
            const parsed = JSON.parse(input);
            setOutput(JSON.stringify(parsed));
            setError('');
        } catch (e) {
            setError('Invalid JSON');
            setOutput('');
        }
    };

    return (
        <div className="tool-content">
            <div className="input-group">
                <textarea
                    placeholder="Paste JSON here..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    rows={6}
                />
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn" onClick={format}>Prettify</button>
                <button className="btn" onClick={minify}>Minify</button>
            </div>
            {error && <div className="result-area" style={{ color: '#f87171' }}>{error}</div>}
            {output && <pre className="result-area">{output}</pre>}
        </div>
    );
};

export const HashGenerator = () => {
    const [text, setText] = useState('');
    const [alg, setAlg] = useState('sha-256');
    const [hash, setHash] = useState('');

    const generate = async () => {
        const encoder = new TextEncoder();
        const data = encoder.encode(text);
        const hashBuffer = await crypto.subtle.digest(alg.toUpperCase().replace('-', ''), data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        setHash(hashHex);
    };

    return (
        <div className="tool-content">
            <input type="text" placeholder="Enter text..." value={text} onChange={(e) => setText(e.target.value)} />
            <div className="input-group" style={{ marginTop: '1rem' }}>
                <select value={alg} onChange={(e) => setAlg(e.target.value)}>
                    <option value="sha-256">SHA-256</option>
                    <option value="sha-512">SHA-512</option>
                    <option value="sha-1">SHA-1</option>
                </select>
            </div>
            <button className="btn" onClick={generate}>Generate Hash</button>
            {hash && <div className="result-area"><code>{hash}</code></div>}
        </div>
    );
};

export const WordCounter = () => {
    const [text, setText] = useState('');

    const stats = {
        words: text.trim() ? text.trim().split(/\s+/).length : 0,
        chars: text.length,
        lines: text.split('\n').filter(l => l).length
    };

    return (
        <div className="tool-content">
            <textarea
                placeholder="Start typing..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={6}
            />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                <div className="settings-group" style={{ padding: '1rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{stats.words}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>WORDS</div>
                </div>
                <div className="settings-group" style={{ padding: '1rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{stats.chars}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>CHARS</div>
                </div>
                <div className="settings-group" style={{ padding: '1rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{stats.lines}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>LINES</div>
                </div>
            </div>
        </div>
    );
};

export const LoremIpsum = () => {
    const [count, setCount] = useState(3);
    const [type, setType] = useState('paragraphs');

    const generate = () => {
        const base = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ";
        return Array(Number(count)).fill(base).join('\n\n');
    };

    return (
        <div className="tool-content">
            <div className="input-group">
                <label>Count:</label>
                <input type="number" value={count} onChange={(e) => setCount(e.target.value)} />
            </div>
            <pre className="result-area">{generate()}</pre>
        </div>
    );
};
