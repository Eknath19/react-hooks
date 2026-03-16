# 1. Unzip the downloaded file, then:
npx create-react-app my-hooks-app
cd my-hooks-app

# 2. Delete the default src/ folder and paste the project's src/ folder in

# 3. Run it
npm install
npm start
# → http://localhost:3000
```

---

## Project structure (what's inside the ZIP)
```
src/
├── App.jsx                  ← main layout with 6 tabs
├── App.css                  ← layout styles
├── index.js / index.css     ← entry point + global vars
├── ThemeContext.js          ← context for useContext demo
└── components/
    ├── UseStateDemo.jsx     ← 1. useState
    ├── UseEffectDemo.jsx    ← 2. useEffect  (with cleanup logging)
    ├── UseContextDemo.jsx   ← 3. useContext (no prop drilling)
    ├── UseRefDemo.jsx       ← 4. useRef     (DOM + mutable value)
    ├── UseMemoDemo.jsx      ← 5. useMemo    (fibonacci cache)
    ├── UseCallbackDemo.jsx  ← 6. useCallback (stable fn reference)
    └── Demo.module.css      ← shared styles
