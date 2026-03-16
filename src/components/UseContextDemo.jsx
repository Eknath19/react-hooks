import { useState, useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import '../App.css';

function ts() {
  const d = new Date();
  return `${String(d.getMinutes()).padStart(2,'0')}:${String(d.getSeconds()).padStart(2,'0')}.${String(d.getMilliseconds()).slice(0,2)}`;
}

function DeepChild() {
  const { theme } = useContext(ThemeContext);
  const styles = {
    light: { background:'#fff',    color:'#333',    border:'2px solid #e0e0e0' },
    dark:  { background:'#1a1a2e', color:'#e0e0e0', border:'2px solid #444'   },
    green: { background:'#e8f5e9', color:'#1b5e20', border:'2px solid #a5d6a7' },
  };
  const icons = { light:'☀️', dark:'🌙', green:'🌿' };
  return (
    <div style={{ ...styles[theme]||styles.light, borderRadius:8, padding:'18px 20px', textAlign:'center', transition:'all 0.3s' }}>
      <div style={{ fontSize:20, fontWeight:700, marginBottom:6 }}>
        {icons[theme]} {theme.charAt(0).toUpperCase()+theme.slice(1)} Theme Active
      </div>
      <div style={{ fontSize:13, opacity:0.8 }}>
        Reads <code>theme</code> via useContext — zero props received
      </div>
    </div>
  );
}

function MiddleLayer() {
  return (
    <div style={{ padding:'10px 14px', background:'#f9f9f9', border:'1.5px dashed #ccc', borderRadius:8, marginBottom:10 }}>
      <p style={{ fontSize:12, color:'#888', marginBottom:8, fontFamily:'Fira Code' }}>
        MiddleLayer — no theme prop passed here 👇
      </p>
      <DeepChild />
    </div>
  );
}

export default function UseContextDemo() {
  const { theme, setTheme } = useContext(ThemeContext);
  const [log, setLog] = useState([{ t:ts(), msg:'context consumed', val:theme }]);

  const change = t => {
    setTheme(t);
    setLog(l => [{ t:ts(), msg:'theme changed →', val:t }, ...l].slice(0,7));
  };

  return (
    <div>
      <div className="card">
        <div className="live-display">
          <div className="live-label">current theme (from context)</div>
          <div className="live-value">Theme: {theme}</div>
        </div>
        <MiddleLayer />
        <div className="btn-row">
          <button className="btn btn-gray" onClick={()=>change('light')}>☀️ Light</button>
          <button className="btn" style={{background:'#1a1a2e',color:'#e0e0e0'}} onClick={()=>change('dark')}>🌙 Dark</button>
          <button className="btn btn-green" onClick={()=>change('green')}>🌿 Green</button>
        </div>
      </div>
      <div className="log-card">
        <div className="log-title">📋 Context Change Log</div>
        <div className="log">
          {log.map((e,i)=>(
            <div key={i} className="log-line">
              <span className="ts">[{e.t}]</span>{e.msg} <span className="val">{e.val}</span>
            </div>
          ))}
        </div>
        <pre className="snippet">
<span className="kw">const</span> ThemeCtx = <span className="fn">createContext</span>(<span className="str">'light'</span>);{"\n\n"}
<span className="cm">// ① Provide at root</span>{"\n"}
&lt;<span className="fn">ThemeCtx.Provider</span> value={"{"}theme{"}"}>{"\n"}
{"  "}&lt;<span className="fn">App</span> /&gt;{"\n"}
&lt;/<span className="fn">ThemeCtx.Provider</span>&gt;{"\n\n"}
<span className="cm">// ② Consume anywhere — no prop drilling!</span>{"\n"}
<span className="kw">const</span> {"{"} theme {"}"} = <span className="fn">useContext</span>(ThemeCtx);
        </pre>
      </div>
    </div>
  );
}
