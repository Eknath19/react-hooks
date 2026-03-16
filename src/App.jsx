import { useState } from 'react';
import { ThemeContext } from './ThemeContext';
import UseStateDemo    from './components/UseStateDemo';
import UseEffectDemo   from './components/UseEffectDemo';
import UseRefDemo      from './components/UseRefDemo';
import UseMemoDemo     from './components/UseMemoDemo';
import UseCallbackDemo from './components/UseCallbackDemo';
import UseContextDemo  from './components/UseContextDemo';
import UseReducerDemo  from './components/UseReducerDemo';
import './App.css';

const TABS = [
  { id: 'useState',    label: 'useState\nExample' },
  { id: 'useEffect',   label: 'useEffect\nExample' },
  { id: 'useRef',      label: 'useRef\nExample' },
  { id: 'useMemo',     label: 'useMemo\nExample' },
  { id: 'useCallback', label: 'useCallback\nExample' },
  { id: 'useContext',  label: 'useContext\nExample' },
  { id: 'useReducer',  label: 'useReducer\nExample' },
];

const DEMOS = {
  useState:    UseStateDemo,
  useEffect:   UseEffectDemo,
  useRef:      UseRefDemo,
  useMemo:     UseMemoDemo,
  useCallback: UseCallbackDemo,
  useContext:  UseContextDemo,
  useReducer:  UseReducerDemo,
};

export default function App() {
  const [active, setActive] = useState('useState');
  const [theme, setTheme]   = useState('light');
  const Demo = DEMOS[active];

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className="app">
        <div className="header">
          <h1>React Hooks Examples</h1>
        </div>
        <nav className="tabbar">
          {TABS.map(t => (
            <button
              key={t.id}
              className={`tab-btn ${active === t.id ? 'active' : ''}`}
              onClick={() => setActive(t.id)}
            >
              {t.label.split('\n').map((line, i) => (
                <span key={i} style={{ display: 'block' }}>{line}</span>
              ))}
            </button>
          ))}
        </nav>
        <div className="content">
          <div className="section-heading">{active} Hook Example</div>
          <Demo />
        </div>
      </div>
    </ThemeContext.Provider>
  );
}
