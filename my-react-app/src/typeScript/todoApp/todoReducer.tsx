import type { Reducer } from "@reduxjs/toolkit";
import type { Action, TodoState } from "./type.js";

export const initialState: TodoState = [];

export const todoReducer: Reducer<TodoState,Action> = (state = initialState,action) => {
    switch (action.type) {
        case "ADD":
      return [
        ...state,
        { id: Date.now(), text: action.payload, completed: false },
      ];
    case "TOGGLE":
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case "REMOVE":
      return state.filter((todo) => todo.id !== action.payload);
    default:
      return state;
    }
}