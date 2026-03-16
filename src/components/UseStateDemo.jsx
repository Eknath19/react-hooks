import { useState } from 'react';
import '../App.css';

const COLOR_MAP = {
  Green:  '#2e7d32',
  Red:    '#c62828',
  Blue:   '#1565c0',
  Purple: '#6a1b9a',
  Orange: '#e65100',
};

function ts() {
  const d = new Date();
  return `${String(d.getMinutes()).padStart(2,'0')}:${String(d.getSeconds()).padStart(2,'0')}.${String(d.getMilliseconds()).slice(0,2)}`;
}

export default function UseStateDemo() {
  const [color, setColor] = useState('Green');
  const [count, setCount] = useState(0);
  const [log, setLog]     = useState([{ t: ts(), msg: 'initial state', val: 'Green / 0' }]);

  const addLog = (msg, val) => setLog(l => [{ t: ts(), msg, val }, ...l].slice(0, 7));

  const changeColor = c => { setColor(c); addLog('color →', c); };
  const inc  = () => { setCount(n => { addLog('count →', n + 1); return n + 1; }); };
  const dec  = () => { setCount(n => { addLog('count →', n - 1); return n - 1; }); };
  const reset = () => { setColor('Green'); setCount(0); addLog('reset', 'Green / 0'); };

  return (
    <div>
      <div className="card">
        <div className="live-display">
          <div className="live-label">color state</div>
          <div className="live-value" style={{ color: COLOR_MAP[color] }}>
            My Favorite color is {color} !
          </div>
          <div className="color-swatch" style={{ background: COLOR_MAP[color] }} />
        </div>

        <div className="live-display" style={{ paddingTop: 0 }}>
          <div className="live-label">count state</div>
          <div className="live-value">{count}</div>
        </div>

        <div className="btn-row">
          {Object.entries(COLOR_MAP).map(([c, hex]) => (
            <button
              key={c}
              className="btn"
              style={{ background: hex, color: '#fff' }}
              onClick={() => changeColor(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="btn-row">
          <button className="btn btn-red"   onClick={dec}>− Decrement</button>
          <button className="btn btn-green" onClick={inc}>+ Increment</button>
          <button className="btn btn-gray"  onClick={reset}>Reset</button>
        </div>
      </div>

      <div className="log-card">
        <div className="log-title">📋 State Change Log</div>
        <div className="log">
          {log.map((e, i) => (
            <div key={i} className="log-line">
              <span className="ts">[{e.t}]</span>
              {e.msg} <span className="val">{e.val}</span>
            </div>
          ))}
        </div>
        <pre className="snippet">
<span className="kw">const</span> [color, setColor] = <span className="fn">useState</span>(<span className="str">'Green'</span>);{"\n"}
<span className="kw">const</span> [count, setCount] = <span className="fn">useState</span>(<span className="str">0</span>);{"\n\n"}
<span className="cm">// Update state → React re-renders the component</span>{"\n"}
<span className="fn">setColor</span>(<span className="str">'Red'</span>);{"\n"}
<span className="fn">setCount</span>(prev =&gt; prev + <span className="str">1</span>);{"\n\n"}
<span className="cm">// ⚡ CANCELLING: setting same value = no re-render</span>
        </pre>
      </div>
    </div>
  );
}
