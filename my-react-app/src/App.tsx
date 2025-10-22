// src/App.tsx
import React from "react";
import TodoApp from "./typeScript/todoApp/todoApp.js";
import { TodoProvider } from "./typeScript/todoApp/todoContext.js";


function App() {
  return (
    <TodoProvider>
      <TodoApp />
    </TodoProvider>

  );
}

export default App;
