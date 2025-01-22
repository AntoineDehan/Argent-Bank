import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../state/store"

interface SignedState {
  token: string | null
  status: "idle" | "pending" | "fullfilled" | "failed"
  error: string | null
  username: string
  firstname: string
  lastname: string
}

const initialState: SignedState = {
  token: null,
  status: "idle",
  error: null,
  username: "null",
  firstname: "null",
  lastname: "null",
}

//Login
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

//Récupération des données utilisateur après le login
export const infoAsync = createAsyncThunk(
  "signed/info",
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState
    const token = state.signed.token
    console.log("Fetching user profile...")

    if (!token) {
      return rejectWithValue("No token available")
    }

    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to fetch user profile")
      }

      const data = await response.json()
      console.log("GET Profile Response:", data)
      return data.body
    } catch (err: any) {
      return rejectWithValue(err.message)
    }
  },
)

//Permet de changer le nom d'utilisateur
export const editAsync = createAsyncThunk(
  "signed/edit",
  async (credentials: { userName: string }, { rejectWithValue, getState }) => {
    const token = (getState() as RootState).signed.token
    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(credentials),
        },
      )
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to update user info")
      }
      const data = await response.json()
      return data.body.userName
    } catch (err: any) {
      return rejectWithValue(err.message)
    }
  },
)

interface UserProfile {
  email: string
  firstName: string
  lastName: string
  userName: string
  createdAt: string
  updatedAt: string
  id: string
}

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
      .addCase(
        infoAsync.fulfilled,
        (state, action: PayloadAction<UserProfile>) => {
          console.log("User profile fetched successfully:", action.payload)
          state.firstname = action.payload.firstName
          state.lastname = action.payload.lastName
          state.username = action.payload.userName
        },
      )
      .addCase(infoAsync.rejected, (state, action) => {
        console.log("InfoAsync rejecté", action.error.message)
      })
      .addCase(editAsync.fulfilled, (state, action: PayloadAction<string>) => {
        console.log("New User Name:", action.payload)
        state.username = action.payload
      })
  },
})

export const { signed_in, signed_out } = SignedSlice.actions

export default SignedSlice.reducer
