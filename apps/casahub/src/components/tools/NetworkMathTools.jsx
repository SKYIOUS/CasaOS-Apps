import React, { useState, useEffect } from 'react';

export const UnitConverter = () => {
    const [value, setValue] = useState(1);
    const [type, setType] = useState('length');
    const [from, setFrom] = useState('m');
    const [to, setTo] = useState('km');
    const [result, setResult] = useState(0.001);

    const units = {
        length: { m: 1, km: 0.001, cm: 100, mm: 1000, inch: 39.3701, ft: 3.28084, mi: 0.000621371 },
        weight: { kg: 1, g: 1000, mg: 1000000, lb: 2.20462, oz: 35.274 },
        temp: { c: 'c', f: 'f', k: 'k' },
        data: { B: 1, KB: 1 / 1024, MB: 1 / (1024 ** 2), GB: 1 / (1024 ** 3), TB: 1 / (1024 ** 4) }
    };

    const convert = () => {
        if (type === 'temp') {
            let c;
            if (from === 'c') c = value;
            else if (from === 'f') c = (value - 32) * 5 / 9;
            else if (from === 'k') c = value - 273.15;

            let res;
            if (to === 'c') res = c;
            else if (to === 'f') res = (c * 9 / 5) + 32;
            else if (to === 'k') res = c + 273.15;
            setResult(res.toFixed(4));
        } else {
            const val = value / units[type][from];
            const res = val * units[type][to];
            setResult(res.toFixed(6).replace(/\.?0+$/, ''));
        }
    };

    useEffect(convert, [value, type, from, to]);

    return (
        <div className="tool-content">
            <div className="input-group">
                <select value={type} onChange={(e) => { setType(e.target.value); setFrom(Object.keys(units[e.target.value])[0]); setTo(Object.keys(units[e.target.value])[1]); }}>
                    <option value="length">Length</option>
                    <option value="weight">Weight</option>
                    <option value="temp">Temperature</option>
                    <option value="data">Digital Data</option>
                </select>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '1rem', alignItems: 'center' }}>
                <div>
                    <input type="number" value={value} onChange={(e) => setValue(e.target.value)} />
                    <select value={from} onChange={(e) => setFrom(e.target.value)} style={{ marginTop: '0.5rem' }}>
                        {Object.keys(units[type]).map(u => <option key={u} value={u}>{u.toUpperCase()}</option>)}
                    </select>
                </div>
                <div style={{ fontSize: '1.5rem' }}>=</div>
                <div>
                    <div className="result-area" style={{ margin: 0, padding: '0.75rem', fontSize: '1.2rem', fontWeight: 'bold' }}>{result}</div>
                    <select value={to} onChange={(e) => setTo(e.target.value)} style={{ marginTop: '0.5rem' }}>
                        {Object.keys(units[type]).map(u => <option key={u} value={u}>{u.toUpperCase()}</option>)}
                    </select>
                </div>
            </div>
        </div>
    );
};

export const MathTools = () => {
    const [val1, setVal1] = useState(0);
    const [val2, setVal2] = useState(0);
    const [tool, setTool] = useState('percent');

    const getResult = () => {
        if (tool === 'percent') return (val1 / 100) * val2;
        if (tool === 'aspect') {
            const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
            const common = gcd(val1, val2);
            return val1 && val2 ? `${val1 / common}:${val2 / common}` : '0:0';
        }
        return 0;
    };

    return (
        <div className="tool-content">
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                <button className="btn" style={{ background: tool === 'percent' ? 'var(--accent-color)' : 'rgba(255,255,255,0.05)' }} onClick={() => setTool('percent')}>Percentage</button>
                <button className="btn" style={{ background: tool === 'aspect' ? 'var(--accent-color)' : 'rgba(255,255,255,0.05)' }} onClick={() => setTool('aspect')}>Aspect Ratio</button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} placeholder={tool === 'percent' ? '%' : 'Width'} />
                <span>{tool === 'percent' ? 'of' : 'x'}</span>
                <input type="number" value={val2} onChange={(e) => setVal2(e.target.value)} placeholder={tool === 'percent' ? 'Value' : 'Height'} />
            </div>

            <div className="result-area" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>RESULT</div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{getResult()}</div>
            </div>
        </div>
    );
};

export const NetworkTools = () => {
    const [ip, setIp] = useState('Loading...');

    useEffect(() => {
        fetch('https://api.ipify.org?format=json')
            .then(res => res.json())
            .then(data => setIp(data.ip))
            .catch(() => setIp('Fetch failed (Check VPN/Adblock)'));
    }, []);

    return (
        <div className="tool-content">
            <div className="settings-group" style={{ textAlign: 'center', padding: '2rem' }}>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Your Public IP Address</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', fontFamily: 'monospace', color: 'var(--accent-color)' }}>{ip}</div>
                <button className="btn btn-sm" onClick={() => navigator.clipboard.writeText(ip)} style={{ marginTop: '1rem' }}>Copy IP</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="result-area" style={{ margin: 0 }}>
                    <strong>User Agent</strong>
                    <div style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: 'var(--text-secondary)' }}>{navigator.userAgent}</div>
                </div>
                <div className="result-area" style={{ margin: 0 }}>
                    <strong>Connection</strong>
                    <div style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
                        Downlink: {navigator.connection?.downlink || 'N/A'} Mbps<br />
                        RTT: {navigator.connection?.rtt || 'N/A'} ms<br />
                        Type: {navigator.connection?.effectiveType || 'N/A'}
                    </div>
                </div>
            </div>
        </div>
    );
};

export const CountdownTimer = () => {
    const [mins, setMins] = useState(5);
    const [secs, setSecs] = useState(0);
    const [timeLeft, setTimeLeft] = useState(300);
    const [active, setActive] = useState(false);

    useEffect(() => {
        let interval;
        if (active && timeLeft > 0) {
            interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        } else if (timeLeft === 0) {
            setActive(false);
            alert('Time is up!');
        }
        return () => clearInterval(interval);
    }, [active, timeLeft]);

    const start = () => {
        setTimeLeft(Number(mins) * 60 + Number(secs));
        setActive(true);
    };

    const format = (s) => {
        const m = Math.floor(s / 60);
        const ss = s % 60;
        return `${m.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}`;
    };

    return (
        <div className="tool-content" style={{ textAlign: 'center' }}>
            {!active ? (
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', alignItems: 'center' }}>
                    <input type="number" value={mins} onChange={(e) => setMins(e.target.value)} style={{ width: '80px', textAlign: 'center' }} />
                    <span>m</span>
                    <input type="number" value={secs} onChange={(e) => setSecs(e.target.value)} style={{ width: '80px', textAlign: 'center' }} />
                    <span>s</span>
                </div>
            ) : (
                <div style={{ fontSize: '5rem', fontWeight: '800', fontFamily: 'monospace' }}>{format(timeLeft)}</div>
            )}

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', justifyContent: 'center' }}>
                {!active ? (
                    <button className="btn" onClick={start}>Start Timer</button>
                ) : (
                    <>
                        <button className="btn" style={{ background: '#f87171' }} onClick={() => setActive(false)}>Pause</button>
                        <button className="btn" onClick={() => { setActive(false); setTimeLeft(0); }}>Stop</button>
                    </>
                )}
            </div>
        </div>
    );
};
