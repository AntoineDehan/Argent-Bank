import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

interface SignedState {
  token: string | null
  status: "idle" | "pending" | "fullfilled" | "failed"
  error: string | null
}

const initialState: SignedState = {
  token: null,
  status: "idle",
  error: null,
}

export const connexionAsync = createAsyncThunk(
  "signed/connexion",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Login failed")
      }
      const data = await response.json()
      console.log("API Response:", data)
      return data.body.token
    } catch (err: any) {
      return rejectWithValue(err.message)
    }
  },
)

const SignedSlice = createSlice({
  name: "signed",
  initialState,
  reducers: {
    signed_in: state => {},
    signed_out: state => {
      state.token = null
      state.status = "idle"
      state.error = null
    },
  },
  extraReducers: builder => {
    builder
      .addCase(connexionAsync.pending, state => {
        state.status = "pending"
        state.error = null
      })
      .addCase(
        connexionAsync.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.token = action.payload
          state.status = "fullfilled"
        },
      )
      .addCase(connexionAsync.rejected, (state, action) => {
        state.status = "failed"
        state.token = null
        state.error = action.payload as string
      })
  },
})

export const { signed_in, signed_out } = SignedSlice.actions

export default SignedSlice.reducer
