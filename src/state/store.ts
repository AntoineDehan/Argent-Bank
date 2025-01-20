import { configureStore } from "@reduxjs/toolkit"
import SignedReducer from "./signed/SignedSlice"

export const store = configureStore({
  reducer: {
    signed: SignedReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
