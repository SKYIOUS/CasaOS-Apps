import React, { useState } from 'react';

export const PasswordGenerator = () => {
    const [password, setPassword] = useState('');
    const [length, setLength] = useState(16);
    const [options, setOptions] = useState({
        upper: true,
        lower: true,
        numbers: true,
        symbols: true
    });

    const generate = () => {
        const charSets = {
            upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
            lower: "abcdefghijklmnopqrstuvwxyz",
            numbers: "0123456789",
            symbols: "!@#$%^&*()_+~`|}{[]:;?><,./-="
        };

        let charset = "";
        if (options.upper) charset += charSets.upper;
        if (options.lower) charset += charSets.lower;
        if (options.numbers) charset += charSets.numbers;
        if (options.symbols) charset += charSets.symbols;

        if (!charset) {
            setPassword('Select at least one option');
            return;
        }

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
                <input type="range" min="4" max="128" value={length} onChange={(e) => setLength(Number(e.target.value))} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1rem' }}>
                {Object.keys(options).map(o => (
                    <label key={o} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', cursor: 'pointer' }}>
                        <input type="checkbox" checked={options[o]} onChange={() => setOptions(prev => ({ ...prev, [o]: !prev[o] }))} />
                        {o.charAt(0).toUpperCase() + o.slice(1)}
                    </label>
                ))}
            </div>
            <button className="btn" onClick={generate}>Generate Password</button>
            {password && (
                <div className="result-area" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <code style={{ fontSize: '1.1rem' }}>{password}</code>
                    <button className="btn btn-sm" onClick={() => navigator.clipboard.writeText(password)}>Copy</button>
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
            setError('Invalid JSON: ' + e.message);
            setOutput('');
        }
    };

    const minify = () => {
        try {
            const parsed = JSON.parse(input);
            setOutput(JSON.stringify(parsed));
            setError('');
        } catch (e) {
            setError('Invalid JSON: ' + e.message);
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
                    rows={8}
                    style={{ fontFamily: 'monospace' }}
                />
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn" onClick={format}>Prettify</button>
                <button className="btn" onClick={minify}>Minify</button>
                <button className="btn btn-sm" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)' }} onClick={() => setInput('')}>Clear</button>
            </div>
            {error && <div className="result-area" style={{ color: '#f87171', border: '1px solid #f87171' }}>{error}</div>}
            {output && (
                <div className="result-area">
                    <pre style={{ maxHeight: '400px', overflow: 'auto' }}>{output}</pre>
                    <button className="btn btn-sm" onClick={() => navigator.clipboard.writeText(output)} style={{ marginTop: '0.5rem' }}>Copy Result</button>
                </div>
            )}
        </div>
    );
};

export const HashGenerator = () => {
    const [text, setText] = useState('');
    const [alg, setAlg] = useState('sha-256');
    const [hash, setHash] = useState('');

    const generate = async () => {
        if (!text) return;
        const encoder = new TextEncoder();
        const data = encoder.encode(text);
        const hashBuffer = await crypto.subtle.digest(alg.toUpperCase().replace('-', ''), data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        setHash(hashHex);
    };

    return (
        <div className="tool-content">
            <textarea placeholder="Enter text to hash..." value={text} onChange={(e) => setText(e.target.value)} rows={3} />
            <div className="input-group" style={{ marginTop: '1rem' }}>
                <select value={alg} onChange={(e) => setAlg(e.target.value)}>
                    <option value="sha-256">SHA-256</option>
                    <option value="sha-512">SHA-512</option>
                    <option value="sha-1">SHA-1</option>
                </select>
            </div>
            <button className="btn" onClick={generate}>Generate Hash</button>
            {hash && (
                <div className="result-area">
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>{alg.toUpperCase()} Result:</div>
                    <code style={{ wordBreak: 'break-all' }}>{hash}</code>
                    <button className="btn btn-sm" onClick={() => navigator.clipboard.writeText(hash)} style={{ marginTop: '1rem', width: 'auto' }}>Copy Hash</button>
                </div>
            )}
        </div>
    );
};

export const WordCounter = () => {
    const [text, setText] = useState('');

    const stats = {
        words: text.trim() ? text.trim().split(/\s+/).length : 0,
        chars: text.length,
        lines: text.split('\n').filter(l => l.length > 0).length,
        sentences: text.split(/[.!?]+/).filter(s => s.trim().length > 0).length
    };

    return (
        <div className="tool-content">
            <textarea
                placeholder="Start typing or paste text here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={10}
            />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginTop: '1rem' }}>
                {[
                    { label: 'WORDS', val: stats.words },
                    { label: 'CHARS', val: stats.chars },
                    { label: 'LINES', val: stats.lines },
                    { label: 'SENTENCES', val: stats.sentences }
                ].map(s => (
                    <div key={s.label} className="settings-group" style={{ padding: '1rem', textAlign: 'center', margin: 0 }}>
                        <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{s.val}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', letterSpacing: '1px' }}>{s.label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const LoremIpsum = () => {
    const [count, setCount] = useState(3);
    const [type, setType] = useState('paragraphs');
    const [result, setResult] = useState('');

    const generate = () => {
        const base = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ";

        let res = "";
        if (type === 'paragraphs') {
            res = Array(Number(count)).fill(base).join('\n\n');
        } else {
            const words = base.split(' ');
            res = Array(Number(count)).fill(0).map(() => words[Math.floor(Math.random() * words.length)]).join(' ');
        }
        setResult(res);
    };

    return (
        <div className="tool-content">
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <input type="number" min="1" max="50" value={count} onChange={(e) => setCount(e.target.value)} style={{ width: '80px' }} />
                <select value={type} onChange={(e) => setType(e.target.value)} style={{ flex: 1 }}>
                    <option value="paragraphs">Paragraphs</option>
                    <option value="words">Words</option>
                </select>
            </div>
            <button className="btn" onClick={generate}>Generate Text</button>
            {result && (
                <div className="result-area">
                    <pre style={{ maxHeight: '300px', overflow: 'auto' }}>{result}</pre>
                    <button className="btn btn-sm" onClick={() => navigator.clipboard.writeText(result)} style={{ marginTop: '0.5rem' }}>Copy Lorem</button>
                </div>
            )}
        </div>
    );
};
