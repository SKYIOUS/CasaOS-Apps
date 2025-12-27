import React, { useState, useEffect } from 'react';

export const UnitConverter = () => {
    const [val, setVal] = useState(0);
    const [type, setType] = useState('c-f');

    const convert = () => {
        const v = Number(val);
        if (type === 'c-f') return (v * 9 / 5 + 32).toFixed(2) + ' °F';
        if (type === 'f-c') return ((v - 32) * 5 / 9).toFixed(2) + ' °C';
        if (type === 'km-mi') return (v * 0.621371).toFixed(2) + ' mi';
        if (type === 'mi-km') return (v / 0.621371).toFixed(2) + ' km';
        return v;
    };

    return (
        <div className="tool-content">
            <div className="input-group">
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="c-f">Celsius to Fahrenheit</option>
                    <option value="f-c">Fahrenheit to Celsius</option>
                    <option value="km-mi">Kilometers to Miles</option>
                    <option value="mi-km">Miles to Kilometers</option>
                </select>
            </div>
            <input type="number" value={val} onChange={(e) => setVal(e.target.value)} />
            <div className="result-area">Result: {convert()}</div>
        </div>
    );
};

export const MathTools = () => {
    const [a, setA] = useState(0);
    const [b, setB] = useState(0);
    const [tool, setTool] = useState('percent');

    const calculate = () => {
        if (tool === 'percent') return `${a} is ${(a / b * 100).toFixed(2)}% of ${b}`;
        if (tool === 'aspect') {
            const gcd = (x, y) => (!y ? x : gcd(y, x % y));
            const common = gcd(a, b);
            return `Ratio: ${a / common}:${b / common}`;
        }
        return '';
    };

    return (
        <div className="tool-content">
            <div className="input-group">
                <select value={tool} onChange={(e) => setTool(e.target.value)}>
                    <option value="percent">Percentage Calc</option>
                    <option value="aspect">Aspect Ratio Calc</option>
                </select>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
                <input type="number" value={a} onChange={(e) => setA(e.target.value)} placeholder="Val 1" />
                <input type="number" value={b} onChange={(e) => setB(e.target.value)} placeholder="Val 2" />
            </div>
            <div className="result-area">{calculate()}</div>
        </div>
    );
};

export const NetworkTools = () => {
    const [ip, setIp] = useState('Click to fetch');

    const fetchIp = async () => {
        setIp('Fetching...');
        try {
            const res = await fetch('https://api.ipify.org?format=json');
            const data = await res.json();
            setIp(data.ip);
        } catch (e) {
            setIp('Error fetching IP');
        }
    };

    return (
        <div className="tool-content">
            <button className="btn" onClick={fetchIp}>Get My Public IP</button>
            <div className="result-area">{ip}</div>
        </div>
    );
};

export const CountdownTimer = () => {
    const [target, setTarget] = useState(10); // minutes
    const [timeLeft, setTimeLeft] = useState(target * 60);
    const [active, setActive] = useState(false);

    useEffect(() => {
        let timer;
        if (active && timeLeft > 0) {
            timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
        } else if (timeLeft === 0) {
            setActive(false);
            alert('Time is up!');
        }
        return () => clearInterval(timer);
    }, [active, timeLeft]);

    const reset = () => {
        setActive(false);
        setTimeLeft(target * 60);
    };

    const format = (s) => {
        const m = Math.floor(s / 60);
        const rs = s % 60;
        return `${m}:${rs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="tool-content" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', fontWeight: '800', margin: '1rem 0' }}>{format(timeLeft)}</div>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                <input type="number" value={target} onChange={(e) => setTarget(e.target.value)} style={{ width: '80px' }} />
                <span>min</span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn" onClick={() => setActive(!active)}>{active ? 'Pause' : 'Start'}</button>
                <button className="btn btn-sm" onClick={reset}>Reset</button>
            </div>
        </div>
    );
};
