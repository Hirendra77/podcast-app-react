// it is just going to manage data related to user like set data, retrieve data or clear the data

import { createSlice } from '@reduxjs/toolkit'


const initialState={
 user:null,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log("user");
      state.user = action.payload;
    },
   clearUser: (state) => {
      state.user = null;
    },
  },
})
export const {setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;