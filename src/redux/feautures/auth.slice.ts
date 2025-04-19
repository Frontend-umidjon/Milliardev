import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: localStorage.getItem("access_token") || null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, {payload})=>{
        state.value = payload
        localStorage.setItem("access_token", state.value || "")
    },
    logout: (state)=>{
        state.value = null
        localStorage.removeItem("access_token")
    }
  },
})

export const { login,logout } = authSlice.actions

export default authSlice.reducer