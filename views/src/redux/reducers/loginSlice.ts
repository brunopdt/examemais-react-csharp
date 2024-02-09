import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ILoginState {
  profile: string
}

const initialState: ILoginState = {
  profile: "",
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<string>) => {
      state.profile = action.payload
      console.log(action.payload)
    },
  },
})

export const { setProfile } = loginSlice.actions

export default loginSlice.reducer