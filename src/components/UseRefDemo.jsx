import { useState, useRef } from 'react';
import '../App.css';

function ts() {
  const d = new Date();
  return `${String(d.getMinutes()).padStart(2,'0')}:${String(d.getSeconds()).padStart(2,'0')}.${String(d.getMilliseconds()).slice(0,2)}`;
}

export default function UseRefDemo() {
  const inputRef   = useRef(null);
  const counterRef = useRef(0);
  const prevCount  = useRef(undefined);

  const [stateCount, setStateCount] = useState(0);
  const [focused, setFocused]       = useState(false);
  const [display, setDisplay]       = useState('Click a button below to see ref in action');
  const [log, setLog]               = useState([]);

  const addLog = (msg, val) => setLog(l => [{ t: ts(), msg, val }, ...l].slice(0, 7));

  const focusInput = () => {
    inputRef.current.focus();
    setFocused(true);
    addLog('inputRef.current.focus()', 'DOM access ✓');
    setTimeout(() => setFocused(false), 1500);
  };

  const silentCount = () => {
    counterRef.current += 1;
    addLog('counterRef.current =', `${counterRef.current}  (no re-render!)`);
    setDisplay(`counterRef.current = ${counterRef.current}  — mutated silently, no re-render`);
  };

  const incState = () => {
    prevCount.current = stateCount;
    setStateCount(c => c + 1);
    addLog('prevCount.current =', `${stateCount} (before update)`);
  };

  return (
    <div>
      <div className="card">
        <div className="live-display">
          <div className="live-label">ref value display</div>
          <div className="live-value" style={{ fontSize: 15, maxWidth: 420, margin: '8px auto', lineHeight: 1.5 }}>
            {display}
          </div>
        </div>

        <div style={{ textAlign: 'center', margin: '12px 0' }}>
          <input
            ref={inputRef}
            type="text"
            className={`demo-input${focused ? ' highlighted' : ''}`}
            placeholder="I can be focused via ref..."
          />
          <p style={{ fontSize: 11, color: '#888', marginTop: 4, fontFamily: 'Fira Code' }}>
            {focused ? '🟢 focused via inputRef.current.focus()' : 'input not focused'}
          </p>
        </div>

        <div className="btn-row">
          <button className="btn btn-green"  onClick={focusInput}>Focus Input (DOM ref)</button>
          <button className="btn btn-outline" onClick={silentCount}>Silent Count (mutable ref)</button>
        </div>

        <div style={{ marginTop: 16, padding: '12px 16px', background: '#f1f8e9', borderRadius: 8, border: '1.5px solid #a5d6a7', display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#2e7d32' }}>{stateCount}</div>
            <div style={{ fontSize: 11, color: '#888', fontFamily: 'Fira Code' }}>state count (re-renders)</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#2e7d32' }}>{prevCount.current ?? '—'}</div>
            <div style={{ fontSize: 11, color: '#888', fontFamily: 'Fira Code' }}>prevCount ref (previous)</div>
          </div>
        </div>
        <div className="btn-row" style={{ marginTop: 8 }}>
          <button className="btn btn-green" onClick={incState}>Increment State + Track Prev</button>
        </div>
      </div>

      <div className="log-card">
        <div className="log-title">📋 Ref Actions Log</div>
        <div className="log">
          {log.length === 0 && <div className="log-line"><span className="ts">[--:--]</span> waiting for actions...</div>}
          {log.map((e, i) => (
            <div key={i} className="log-line">
              <span className="ts">[{e.t}]</span>
              {e.msg} <span className="val">{e.val}</span>
            </div>
          ))}
        </div>
        <pre className="snippet">
<span className="kw">const</span> inputRef   = <span className="fn">useRef</span>(<span className="kw">null</span>);   <span className="cm">// DOM ref</span>{"\n"}
<span className="kw">const</span> counterRef = <span className="fn">useRef</span>(<span className="str">0</span>);     <span className="cm">// mutable value</span>{"\n\n"}
inputRef.current.<span className="fn">focus</span>();         <span className="cm">// direct DOM access</span>{"\n"}
counterRef.current += <span className="str">1</span>;        <span className="cm">// ⚡ no re-render!</span>
        </pre>
      </div>
    </div>
  );
}
