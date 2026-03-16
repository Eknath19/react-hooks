import { useReducer } from 'react';
import '../App.css';

const initialState = { count: 0, step: 1, history: [] };

function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + state.step,
        history: [...state.history, `+${state.step} → ${state.count + state.step}`].slice(-6),
      };
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - state.step,
        history: [...state.history, `-${state.step} → ${state.count - state.step}`].slice(-6),
      };
    case 'RESET':
      return { ...initialState };
    case 'SET_STEP':
      return { ...state, step: action.payload };
    default:
      return state;
  }
}

export default function UseReducerDemo() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <div className="card">
        <div className="live-display">
          <div className="live-label">state.count</div>
          <div className="live-value">{state.count}</div>
        </div>

        <div className="chip-row">
          <span className="chip">count: {state.count}</span>
          <span className="chip">step: {state.step}</span>
          <span className="chip">actions dispatched: {state.history.length}</span>
        </div>

        <div style={{ textAlign:'center', margin:'12px 0' }}>
          <label style={{ fontSize:13, color:'#888', display:'block', marginBottom:6 }}>
            Step size: <strong style={{ color:'#2e7d32' }}>{state.step}</strong>
          </label>
          <input
            type="range" min="1" max="10" value={state.step}
            onChange={e => dispatch({ type: 'SET_STEP', payload: +e.target.value })}
            className="range"
          />
        </div>

        <div className="btn-row">
          <button className="btn btn-red"   onClick={() => dispatch({ type: 'DECREMENT' })}>
            − Decrement
          </button>
          <button className="btn btn-green" onClick={() => dispatch({ type: 'INCREMENT' })}>
            + Increment
          </button>
          <button className="btn btn-gray"  onClick={() => dispatch({ type: 'RESET' })}>
            Reset
          </button>
        </div>
      </div>

      <div className="log-card">
        <div className="log-title">📋 Action History (last 6)</div>
        <div className="log">
          {state.history.length === 0 && (
            <div className="log-line"><span className="ts">[--:--]</span> dispatch an action above...</div>
          )}
          {[...state.history].reverse().map((h, i) => (
            <div key={i} className="log-line">
              <span className="ts">[action {state.history.length - i}]</span>
              <span className="val">{h}</span>
            </div>
          ))}
        </div>
        <pre className="snippet">
<span className="kw">const</span> [state, dispatch] = <span className="fn">useReducer</span>(reducer, initialState);{"\n\n"}
<span className="fn">dispatch</span>({"{"} type: <span className="str">'INCREMENT'</span> {"}"});{"\n"}
<span className="fn">dispatch</span>({"{"} type: <span className="str">'SET_STEP'</span>, payload: <span className="str">5</span> {"}"});{"\n\n"}
<span className="cm">// reducer(state, action) → new state</span>{"\n"}
<span className="cm">// ⚡ Great for complex multi-field state logic</span>
        </pre>
      </div>
    </div>
  );
}
