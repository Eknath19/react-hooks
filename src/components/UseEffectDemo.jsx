import { useState, useEffect } from 'react';
import '../App.css';

function ts() {
  const d = new Date();
  return `${String(d.getMinutes()).padStart(2,'0')}:${String(d.getSeconds()).padStart(2,'0')}.${String(d.getMilliseconds()).slice(0,2)}`;
}

export default function UseEffectDemo() {
  const [ms, setMs]         = useState(0);
  const [running, setRunning] = useState(false);
  const [log, setLog]         = useState([]);

  const addLog = (msg, val) => setLog(l => [{ t: ts(), msg, val }, ...l].slice(0, 8));

  useEffect(() => {
    addLog('✅ mount effect fired', 'deps: []');
  }, []);

  useEffect(() => {
    if (!running) return;

    const id = setInterval(() => setMs(t => t + 10), 10);
    addLog('▶ timer started', `id=${id}`);

    return () => {
      clearInterval(id);
      addLog('⛔ CLEANUP: clearInterval', `id=${id} cancelled ✓`);
    };
  }, [running]);

  const fmt = v =>
    `${Math.floor(v / 1000)}.${String(Math.floor((v % 1000) / 10)).padStart(2, '0')}`;

  return (
    <div>
      <div className="card">
        <div className="live-display">
          <div className="live-label">stopwatch — useEffect with cleanup</div>
          <div className="timer-face">{fmt(ms)}s</div>
        </div>
        <div className="btn-row">
          <button
            className={`btn ${running ? 'btn-red' : 'btn-green'}`}
            onClick={() => setRunning(r => !r)}
          >
            {running ? '⏸ Stop' : '▶ Start'}
          </button>
          <button className="btn btn-gray" onClick={() => { setRunning(false); setMs(0); }}>
            Reset
          </button>
        </div>
        <p style={{ textAlign: 'center', fontSize: 12, color: '#888', marginTop: 12 }}>
          Stop the timer → watch the cleanup entry appear in the log below
        </p>
      </div>

      <div className="log-card">
        <div className="log-title">📋 Effect & Cleanup Log</div>
        <div className="log">
          {log.length === 0 && (
            <div className="log-line"><span className="ts">[--:--]</span> press Start to see effects...</div>
          )}
          {log.map((e, i) => (
            <div key={i} className="log-line">
              <span className="ts">[{e.t}]</span>
              {e.msg} <span className="val">{e.val}</span>
            </div>
          ))}
        </div>
        <pre className="snippet">
<span className="fn">useEffect</span>(() =&gt; {"{"}
{"  "}<span className="kw">const</span> id = <span className="fn">setInterval</span>(tick, <span className="str">10</span>);

{"  "}<span className="cm">// ⚡ CANCELLING: cleanup runs on unmount / dep change</span>
{"  "}<span className="kw">return</span> () =&gt; <span className="fn">clearInterval</span>(id);
{"}"}, [running]); <span className="cm">// re-runs when 'running' changes</span>
        </pre>
      </div>
    </div>
  );
}
