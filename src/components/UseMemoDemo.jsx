import { useState, useMemo } from 'react';
import '../App.css';

function ts() {
  const d = new Date();
  return `${String(d.getMinutes()).padStart(2,'0')}:${String(d.getSeconds()).padStart(2,'0')}.${String(d.getMilliseconds()).slice(0,2)}`;
}

function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}

export default function UseMemoDemo() {
  const [n, setN]       = useState(10);
  const [tick, setTick] = useState(0);
  const [log, setLog]   = useState([]);

  const addLog = (msg, val) => setLog(l => [{ t: ts(), msg, val }, ...l].slice(0, 7));

  const memoResult = useMemo(() => {
    const t0 = performance.now();
    const result = fib(n);
    const elapsed = (performance.now() - t0).toFixed(3);
    addLog(`🔄 recomputed fib(${n})`, `= ${result.toLocaleString()} in ${elapsed}ms`);
    return { result, elapsed };
  // eslint-disable-next-line
  }, [n]);

  return (
    <div>
      <div className="card">
        <div className="live-display">
          <div className="live-label">useMemo — cached fibonacci result</div>
          <div className="live-value">
            fib({n}) = {memoResult.result.toLocaleString()}
          </div>
          <p style={{ fontSize: 12, color: '#888', marginTop: 4, fontFamily: 'Fira Code' }}>
            computed in {memoResult.elapsed}ms · cached until n changes
          </p>
        </div>

        <div className="memo-grid">
          <div className="memo-box">
            <div className="num">{n}</div>
            <div className="lbl">input n</div>
          </div>
          <div className="memo-box">
            <div className="num" style={{ fontSize: n > 30 ? 16 : 26 }}>
              {memoResult.result.toLocaleString()}
            </div>
            <div className="lbl">fib result</div>
          </div>
          <div className="memo-box">
            <div className="num">{memoResult.elapsed}ms</div>
            <div className="lbl">last compute time</div>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <input
            type="range" min="1" max="35" value={n}
            onChange={e => setN(+e.target.value)}
            className="range"
          />
          <p style={{ fontSize: 12, color: '#888', marginTop: 4 }}>drag to change n → triggers recompute</p>
        </div>

        <div className="btn-row">
          <button className="btn btn-gray" onClick={() => setTick(t => t + 1)}>
            Re-render Parent (tick={tick}) — memo NOT recomputed
          </button>
        </div>
      </div>

      <div className="log-card">
        <div className="log-title">📋 Computation Log (only logs when n changes)</div>
        <div className="log">
          {log.length === 0 && (
            <div className="log-line"><span className="ts">[--:--]</span> drag the slider to trigger recompute...</div>
          )}
          {log.map((e, i) => (
            <div key={i} className="log-line">
              <span className="ts">[{e.t}]</span>
              {e.msg} <span className="val">{e.val}</span>
            </div>
          ))}
        </div>
        <pre className="snippet">
<span className="kw">const</span> result = <span className="fn">useMemo</span>(() =&gt; <span className="fn">fib</span>(n), [n]);{"\n\n"}
<span className="cm">// ⚡ CANCELLING:</span>{"\n"}
<span className="cm">// tick re-renders → result stays cached</span>{"\n"}
<span className="cm">// n changes       → result recomputed</span>
        </pre>
      </div>
    </div>
  );
}
