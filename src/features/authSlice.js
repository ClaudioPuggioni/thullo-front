import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../apiConfig";

const signup = createAsyncThunk("auth/signup", async (values) => {
  const URL = `${BASE_URL}/auth/signup`;
  console.log("URL:", URL);
  try {
    const response = await axios({ method: "POST", url: URL, data: values });
    return response.data;
  } catch (err) {
    if (err.response) {
      // Request made, server responded
      alert(`ERROR-${err.response.status}: ${err.response.data}`);
    } else if (err.request) {
      // Request made, no response received
      console.log("ERR.REQUEST:", err.request);
    } else {
      // Error triggered in response setup
      console.log("ERR.REQUEST/FAIL:", err.message);
    }
    return;
  }
});

const login = createAsyncThunk("auth/login", async (values) => {
  const URL = `${BASE_URL}/auth/login`;
  console.log("URL:", URL);
  try {
    const response = await axios({ method: "POST", url: URL, data: values });
    return response.data;
  } catch (err) {
    if (err.response) {
      // Request made, server responded
      alert(`ERROR-${err.response.status}: ${err.response.data}`);
    } else if (err.request) {
      // Request made, no response received
      console.log("ERR.REQUEST:", err.request);
    } else {
      // Error triggered in response setup
      console.log("ERR.REQUEST/FAIL:", err.message);
    }
    return;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: { loading: false, lgn: false, userInfo: false },
  reducers: {
    logout: (state, action) => {
      state.userInfo = false;
      state.lgn = false;
      localStorage.clear();
    },
  },
  extraReducers: {
    // Sign Up
    [signup.pending]: (state, action) => {
      state.loading = true;
    },
    [signup.rejected]: (state, action) => {
      state.loading = false;
    },
    [signup.fulfilled]: (state, action) => {
      state.userInfo = action.payload.user;
      localStorage.setItem("email", action.payload.user.email);
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      alert(action.payload.msg);
      console.log("SIGNUP/STATE:", current(state));
      state.lgn = true;
      state.loading = false;
    },

    // Log In
    [login.pending]: (state, action) => {
      state.loading = true;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
    },
    [login.fulfilled]: (state, action) => {
      state.userInfo = action.payload.user;
      localStorage.setItem("email", action.payload.user.email);
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      alert(action.payload.msg);
      console.log("LOGIN/STATE:", current(state));
      state.lgn = true;
      state.loading = false;
    },
  },
});

export { signup, login };
export const { logout } = authSlice.actions;
export default authSlice.reducer;
