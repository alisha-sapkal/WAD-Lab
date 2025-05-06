// src/App.js
import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>React Counter using useState Hook</h1>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>&nbsp;
      <button onClick={() => setCount(count - 1)}>Decrement</button>&nbsp;
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

export default App;
