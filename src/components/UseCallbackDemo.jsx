import { useState, useCallback, useRef, memo } from 'react';
import '../App.css';

function ts() {
  const d = new Date();
  return `${String(d.getMinutes()).padStart(2,'0')}:${String(d.getSeconds()).padStart(2,'0')}.${String(d.getMilliseconds()).slice(0,2)}`;
}

const Child = memo(function Child({ label, onAction, renderCountRef }) {
  renderCountRef.current += 1;
  return (
    <div className="cb-child">
      <span className="cb-child-label">{label}</span>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <span className="render-badge">renders: {renderCountRef.current}</span>
        <button className="btn btn-green" style={{ padding: '5px 14px' }} onClick={onAction}>
          click
        </button>
      </div>
    </div>
  );
});

export default function UseCallbackDemo() {
  const [count, setCount] = useState(0);
  const [tick,  setTick]  = useState(0);
  const [log,   setLog]   = useState([]);

  const stableRenders   = useRef(0);
  const unstableRenders = useRef(0);

  const addLog = (msg, val) => setLog(l => [{ t: ts(), msg, val }, ...l].slice(0, 7));

  const stableAction = useCallback(() => {
    setCount(c => c + 1);
    addLog('stable fn called', 'useCallback — reference unchanged');
  }, []);

  const unstableAction = () => {
    setCount(c => c + 1);
    addLog('unstable fn called', 'new fn every render → child re-renders');
  };

  return (
    <div>
      <div className="card">
        <div className="live-display">
          <div className="live-label">shared counter (both children update this)</div>
          <div className="live-value">{count}</div>
        </div>

        <Child
          label="✅ with useCallback (stable ref)"
          onAction={stableAction}
          renderCountRef={stableRenders}
        />
        <Child
          label="⚠️ without useCallback (new fn every render)"
          onAction={unstableAction}
          renderCountRef={unstableRenders}
        />

        <div className="btn-row">
          <button className="btn btn-gray" onClick={() => setTick(t => t + 1)}>
            Re-render Parent (tick={tick})
          </button>
        </div>
        <p style={{ textAlign: 'center', fontSize: 12, color: '#888', marginTop: 8 }}>
          ↑ Click "Re-render Parent" — stable child render count stays the same
        </p>
      </div>

      <div className="log-card">
        <div className="log-title">📋 Action Log</div>
        <div className="log">
          {log.length === 0 && (
            <div className="log-line"><span className="ts">[--:--]</span> click the child buttons or re-render parent...</div>
          )}
          {log.map((e, i) => (
            <div key={i} className="log-line">
              <span className="ts">[{e.t}]</span>
              {e.msg} <span className="val">{e.val}</span>
            </div>
          ))}
        </div>
        <pre className="snippet">
<span className="cm">// ✅ stable — child won't re-render on parent re-render</span>{"\n"}
<span className="kw">const</span> stable = <span className="fn">useCallback</span>(() =&gt; <span className="fn">doThing</span>(), []);{"\n\n"}
<span className="cm">// ⚡ CANCELLING: prevents needless child re-renders</span>{"\n"}
<span className="cm">// ❌ unstable — new fn every render → child always re-renders</span>{"\n"}
<span className="kw">const</span> unstable = () =&gt; <span className="fn">doThing</span>();
        </pre>
      </div>
    </div>
  );
}
