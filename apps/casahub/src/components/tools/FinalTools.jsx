import React, { useState } from 'react';

export const FinalTools = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const encode = () => {
        const el = document.createElement('div');
        el.innerText = input;
        setOutput(el.innerHTML);
    };

    const decode = () => {
        const el = document.createElement('div');
        el.innerHTML = input;
        setOutput(el.innerText);
    };

    return (
        <div className="tool-content">
            <textarea
                placeholder="Enter text or HTML entities..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={6}
            />
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button className="btn" onClick={encode}>Encode Entities</button>
                <button className="btn" onClick={decode}>Decode Entities</button>
            </div>
            {output && (
                <div className="result-area">
                    <pre>{output}</pre>
                    <button className="btn btn-sm" onClick={() => navigator.clipboard.writeText(output)} style={{ marginTop: '0.5rem' }}>Copy Output</button>
                </div>
            )}
        </div>
    );
};

export const QrGenerator = () => {
    const [text, setText] = useState('');
    const [qrUrl, setQrUrl] = useState('');

    const generate = () => {
        if (!text) return;
        // Using a public API for QR generation to avoid heavy dependencies in this simple suite
        const url = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(text)}`;
        setQrUrl(url);
    };

    return (
        <div className="tool-content" style={{ textAlign: 'center' }}>
            <input
                placeholder="Enter URL or text for QR code..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button className="btn" onClick={generate} style={{ marginTop: '1rem' }}>Generate QR Code</button>

            {qrUrl && (
                <div className="result-area" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                    <img src={qrUrl} alt="QR Code" style={{ background: 'white', padding: '10px', borderRadius: '10px' }} />
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="btn btn-sm" onClick={() => window.open(qrUrl)}>Open in New Tab</button>
                        <button className="btn btn-sm" style={{ background: 'rgba(255,255,255,0.1)' }} onClick={() => setQrUrl('')}>Clear</button>
                    </div>
                </div>
            )}
        </div>
    );
};
