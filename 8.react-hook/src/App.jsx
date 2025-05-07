// src/App.js
import React, { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="card">
      <h1>React Counter using useState Hook</h1>
      <h2>Count: {count}</h2>
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => setCount(count + 1)}>Increment</button>&nbsp;
        <button onClick={() => setCount(count - 1)}>Decrement</button>&nbsp;
        <button onClick={() => setCount(0)}>Reset</button>
      </div>
    </div>
  );
}

export default App;
