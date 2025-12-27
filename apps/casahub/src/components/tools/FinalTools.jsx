import React, { useState } from 'react';

export const FinalTools = () => {
    const [input, setInput] = useState('');
    const [mode, setMode] = useState('encode');

    const processHtml = () => {
        if (mode === 'encode') {
            return input.replace(/[\u00A0-\u9999<>&]/g, (i) => `&#${i.charCodeAt(0)};`);
        } else {
            const doc = new DOMParser().parseFromString(input, "text/html");
            return doc.documentElement.textContent;
        }
    };

    return (
        <div className="tool-content">
            <div className="input-group">
                <select value={mode} onChange={(e) => setMode(e.target.value)}>
                    <option value="encode">Encode Entities</option>
                    <option value="decode">Decode Entities</option>
                </select>
            </div>
            <textarea placeholder="Enter text..." value={input} onChange={(e) => setInput(e.target.value)} rows={4} />
            <div className="result-area">{processHtml()}</div>
        </div>
    );
};

export const QrGenerator = () => {
    const [text, setText] = useState('');

    const qrUrl = text ? `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}` : '';

    return (
        <div className="tool-content" style={{ textAlign: 'center' }}>
            <input type="text" placeholder="Enter URL or text..." value={text} onChange={(e) => setText(e.target.value)} />
            {qrUrl && (
                <div style={{ marginTop: '1.5rem', background: 'white', padding: '1rem', display: 'inline-block', borderRadius: '12px' }}>
                    <img src={qrUrl} alt="QR Code" style={{ display: 'block' }} />
                </div>
            )}
            {!text && <div style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>QR preview will appear here</div>}
        </div>
    );
};
