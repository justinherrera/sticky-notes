import { createSlice } from "@reduxjs/toolkit"
import { v4 as uuid } from 'uuid';
import type { PayloadAction } from '@reduxjs/toolkit'

interface Todo {
  id: number
  title: string
  body: string  
}

interface TodoPayload {
  title: string;
  body: string;
}


const todoSlice = createSlice({
  name: "todo",
  initialState: [] as TodoPayload[],
  reducers: {
    create: {
      prepare(title: string, body: string) {
        return {
          payload: {
            id: uuid(),
            title,
            body,
          }
        }
      },
      reducer(state, action: PayloadAction<TodoPayload>) {
        console.log(action.payload)
        state.push(action.payload)
      },
    }
  }
})

export const { create }  = todoSlice.actions
export default todoSlice.reducer
