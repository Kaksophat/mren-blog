import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Currentuser: null,
  error: null,
  loading: false,
};

const userslice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInstart: (state) => {
      state.error = null;
      state.loading = true;
    },
    signInsuccess: (state, action) => {
      state.Currentuser = action.payload;
      state.error = null;
      state.loading = false;
    },
    signInfailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signOutsuccess: (state)=>{
      state.Currentuser = null;
      state.error = null;
      state.loading = false;
    }
  },
});

export const { signInstart, signInsuccess, signInfailure , signOutsuccess} = userslice.actions;

export default userslice.reducer;
