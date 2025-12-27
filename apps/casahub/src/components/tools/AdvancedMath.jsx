import React, { useState } from 'react';

export const ScientificCalculator = () => {
    const [expr, setExpr] = useState('');
    const [result, setResult] = useState('');

    const calc = (val) => {
        if (val === '=') {
            try {
                // Simple eval-like replacement for math functions
                const processed = expr
                    .replace(/sin/g, 'Math.sin')
                    .replace(/cos/g, 'Math.cos')
                    .replace(/tan/g, 'Math.tan')
                    .replace(/sqrt/g, 'Math.sqrt')
                    .replace(/PI/g, 'Math.PI')
                    .replace(/log/g, 'Math.log10');

                // Use Function instead of eval for slightly better security
                const res = new Function('return ' + processed)();
                setResult(res);
            } catch (e) {
                setResult('Error');
            }
        } else if (val === 'C') {
            setExpr('');
            setResult('');
        } else {
            setExpr(prev => prev + val);
        }
    };

    const buttons = [
        '(', ')', 'sqrt', 'C',
        '7', '8', '9', '/',
        '4', '5', '6', '*',
        '1', '2', '3', '-',
        '0', '.', '=', '+',
        'sin', 'cos', 'tan', 'PI'
    ];

    return (
        <div className="tool-content">
            <div className="result-area" style={{ textAlign: 'right', fontSize: '1.5rem', minHeight: '60px', marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{expr || '0'}</div>
                <div>{result !== '' ? result : (expr || '0')}</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                {buttons.map(b => (
                    <button
                        key={b}
                        className="btn btn-sm"
                        style={{
                            background: ['=', 'C'].includes(b) ? 'var(--accent-color)' : 'rgba(255,255,255,0.05)',
                            padding: '1rem',
                            fontSize: '1rem'
                        }}
                        onClick={() => calc(b)}
                    >
                        {b}
                    </button>
                ))}
            </div>
        </div>
    );
};
