# 1. Clone the repo:
npx create-react-app my-hooks-app
cd my-hooks-app

# 3. Run it
    npm install
    npm start
    http://localhost:3000


# Overview
```
src/
├── App.jsx                  # main layout with 6 tabs
├── App.css                  # layout styles
├── index.js                 # entry point
├── index.css                # global styles
├── ThemeContext.js          # context for useContext demo
└── components/
    ├── UseStateDemo.jsx     # 1. useState
    ├── UseEffectDemo.jsx    # 2. useEffect (with cleanup logging)
    ├── UseContextDemo.jsx   # 3. useContext (no prop drilling)
    ├── UseRefDemo.jsx       # 4. useRef (DOM + mutable value)
    ├── UseMemoDemo.jsx      # 5. useMemo (fibonacci cache)
    ├── UseCallbackDemo.jsx  # 6. useCallback (stable fn reference)
    └── Demo.module.css      # shared styles
```
