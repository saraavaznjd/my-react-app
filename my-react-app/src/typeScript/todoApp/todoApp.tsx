import React, { useReducer, useState } from "react";
import type { Reducer } from "react";
import { initialState, todoReducer } from "./todoReducer.js";

export default function TodoApp() {
  const [todos, dispatch] = useReducer(todoReducer, initialState);
  const [text, setText] = useState("");

  const addTodo = () => {
    if (!text.trim()) return;
    dispatch({ type: "ADD", payload: text });
    setText("");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Typed Todo App ✅</h1>

      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-1"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter todo..."
        />
        <button className="bg-blue-500 text-white px-4" onClick={addTodo}>
          Add
        </button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="flex justify-between mb-2">
            <span
              onClick={() => dispatch({ type: "TOGGLE", payload: todo.id })}
              className={todo.completed ? "line-through text-gray-400" : ""}
            >
              {todo.text}
            </span>
            <button
              className="text-red-500"
              onClick={() => dispatch({ type: "REMOVE", payload: todo.id })}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
