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
    clear: (state) => {
      return [];
    },
  },
});

export const { create, deleteOne, clear } = todoSlice.actions;
export default todoSlice.reducer;
