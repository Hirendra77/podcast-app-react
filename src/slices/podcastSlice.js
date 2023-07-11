// it is just going to manage data related to user like set data, retrieve data or clear the data

import { createSlice } from '@reduxjs/toolkit'

const initialState={
 podcasts:[],
};

const podcastSlice = createSlice({
  name: "podcasts",
  initialState,
  reducers: {
    setPodcasts: (state, action) => {
      
      state.podcasts = action.payload;
    },
  
  },
})
export const {setPodcasts} = podcastSlice.actions;
export default podcastSlice.reducer;