import { createSlice } from "@reduxjs/toolkit";

const actionslice = createSlice({
  name: 'todo',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      const { title, text } = action.payload;
      const newTodo = {
        id: Date.now(),
        title,
        text,
      };
      state.push(newTodo);
    },
    editTodo: (state, action) => {
      const { id, title, text } = action.payload;
      const existingTodo = state.find(todo => todo.id === id);
      if (existingTodo) {
        existingTodo.title = title;
        existingTodo.text = text;
      }
    },
    deleteTodo: (state, action) => {
      return state.filter(todo => todo.id !== action.payload);
    },
  }
});

export default actionslice.reducer;
export const { addTodo, editTodo, deleteTodo } = actionslice.actions;
