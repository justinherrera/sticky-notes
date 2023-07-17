import { createSlice, current } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import type { PayloadAction } from "@reduxjs/toolkit";

interface TodoPayload {
  id: string;
  title: string;
}

const todoSlice = createSlice({
  name: "todo",
  initialState: [] as TodoPayload[],
  reducers: {
    create: {
      prepare(title: string) {
        return {
          payload: {
            id: uuid(),
            title,
          },
        };
      },
      reducer(state, action: PayloadAction<TodoPayload>) {
        console.log(action.payload);
        state.push(action.payload);
      },
    },
    deleteOne: (state, action: PayloadAction<string>) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
    updateOne: (state, action) => {
      console.log(action.payload);
      console.log(current(state));
      const todoIndex = state.findIndex(
        (todo) => todo.id === action.payload.id
      );
      console.log(todoIndex);
      if (todoIndex !== -1) {
        // state[todoIndex] = { ...state[todoIndex], ...updatedUser };
        console.log(current(state[todoIndex]));
        state[todoIndex] = action.payload;
      }
    },
    clear: () => {
      return [];
    },
  },
});

export const { create, deleteOne, updateOne, clear } = todoSlice.actions;
export default todoSlice.reducer;
