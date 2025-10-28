import React from 'react';
import { useAppSelector, useAppDispatch } from './typeScript/counterApp/app/hook.js';
import { increment, decrement, incrementbyAmount } from './typeScript/counterApp/features/counterSlice.js';
import PostsList from './typeScript/miniBlogByRTK/components/postsList.js';

function App() {
  
  return (
    <div className="p-4 text-center">
      <PostsList/>
    </div>
  );
}

export default App;
