import React, { useState } from 'react';

export const CaseConverter = () => {
    const [text, setText] = useState('');

    const convert = (type) => {
        if (type === 'upper') setText(text.toUpperCase());
        if (type === 'lower') setText(text.toLowerCase());
        if (type === 'title') setText(text.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' '));
        if (type === 'sentence') setText(text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase()));
    };

    return (
        <div className="tool-content">
            <textarea value={text} onChange={(e) => setText(e.target.value)} rows={6} placeholder="Enter text to convert case..." />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', marginTop: '1rem' }}>
                <button className="btn btn-sm" onClick={() => convert('upper')}>UPPERCASE</button>
                <button className="btn btn-sm" onClick={() => convert('lower')}>lowercase</button>
                <button className="btn btn-sm" onClick={() => convert('title')}>Title Case</button>
                <button className="btn btn-sm" onClick={() => convert('sentence')}>Sentence Case</button>
            </div>
            <button className="btn" style={{ marginTop: '1rem' }} onClick={() => navigator.clipboard.writeText(text)}>Copy Result</button>
        </div>
    );
};

export const DiffViewer = () => {
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [isDiff, setIsDiff] = useState(false);

    return (
        <div className="tool-content">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>TEXT A</label>
                    <textarea value={text1} onChange={(e) => setText1(e.target.value)} rows={8} />
                </div>
                <div>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>TEXT B</label>
                    <textarea value={text2} onChange={(e) => setText2(e.target.value)} rows={8} />
                </div>
            </div>
            <button className="btn" onClick={() => setIsDiff(true)}>Compare Texts</button>
            {isDiff && (
                <div className="result-area">
                    {text1 === text2 ? (
                        <div style={{ color: '#4ade80' }}>✓ Texts are identical!</div>
                    ) : (
                        <div style={{ color: '#f87171' }}>✗ Texts are different.</div>
                    )}
                </div>
            )}
        </div>
    );
};

export const MarkdownPreview = () => {
    const [text, setText] = useState('# Hello World\n\nStart typing **markdown** here...');

    return (
        <div className="tool-content">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <textarea value={text} onChange={(e) => setText(e.target.value)} rows={12} style={{ fontFamily: 'monospace' }} />
                <div className="result-area" style={{ margin: 0, overflow: 'auto', background: 'var(--panel-bg)' }}>
                    <div dangerouslySetInnerHTML={{
                        __html: text
                            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
                            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
                            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
                            .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
                            .replace(/\*(.*)\*/gim, '<i>$1</i>')
                            .replace(/\n/gim, '<br />')
                    }} />
                </div>
            </div>
        </div>
    );
};
