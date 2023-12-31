import { configureStore } from "@reduxjs/toolkit"
import todoSlice from "../features/todoSlice"

const store = configureStore({
  reducer: {
    todos: todoSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export default store