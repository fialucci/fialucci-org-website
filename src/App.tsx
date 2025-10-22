import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="app">
      <header>
        <h1>Fialucci Org Website</h1>
        <p>Welcome! This is a starter React + Vite + TypeScript project.</p>
      </header>
      <main>
        <button onClick={() => setCount(c => c + 1)}>Count is {count}</button>
      </main>
    </div>
  );
}

export default App;
