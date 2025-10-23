import React from 'react';
import { useAppSelector, useAppDispatch } from './typeScript/counterApp/app/hook.js';
import { increment, decrement, incrementbyAmount } from './typeScript/counterApp/features/counterSlice.js';

function App() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Redux Toolkit + TypeScript Counter</h1>
      <p className="text-xl mb-4">Count: {count}</p>

      <button onClick={() => dispatch(increment())} className="px-4 py-2 bg-green-500 text-white rounded mx-2">
        + Increment
      </button>
      <button onClick={() => dispatch(decrement())} className="px-4 py-2 bg-red-500 text-white rounded mx-2">
        - Decrement
      </button>
      <button onClick={() => dispatch(incrementbyAmount(5))} className="px-4 py-2 bg-blue-500 text-white rounded mx-2">
        +5
      </button>
    </div>
  );
}

export default App;
