import { createSlice } from "@reduxjs/toolkit";
import axios from "../../services/AxiosConfig";

const initialState = {
  user: null,
  isError: false,
  isAuth: false,
};

const userSlice = createSlice({
  initialState: initialState,
  name: "user",
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user;
      state.isAuth = action.payload.isAuth;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    logout(state, action) {
      state.user = null;
      state.isAuth = null;
    },
  },
});

export const { setUser, logout, setError } = userSlice.actions;

export function loginUser(data) {
  return async function (dispatch) {
    try {
      const res = await axios.post(
        "http://localhost:3000/user/loginuser",
        data
      );
      if (!res.data.isAuth) {
        dispatch(setError(res.data.message));
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export function logoutUser() {
  return async function (dispatch) {
    try {
      const res = await axios.post("http://localhost:3000/user/logoutUser");
      console.log(res);
      dispatch(logout);
    } catch (error) {
      console.log(error);
    }
  };
}

export default userSlice.reducer;
