import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axiosClient, { BASE_URL } from "../apiConfig";

const getBGs = createAsyncThunk("data/getBGs", async () => {
  const query = "wallpaper";
  let URL = `https://api.unsplash.com/search/photos?client_id=56p71PWCNpxHLfx1glbJg94czzJKzQfmDmoykqYcYic&query=${query}&per_page=4"`;
  let response = await axiosClient({ method: "GET", url: URL });
  console.log(response.data);
  return response.data;
});

const getBoards = createAsyncThunk("data/getBoards", async () => {
  const URL = `${BASE_URL}/boards`;
  let response = await axiosClient({ method: "GET", url: URL });
  console.log(response.data);
  return response.data;
});

const createBoard = createAsyncThunk("data/createBoard", async (values) => {
  const URL = `${BASE_URL}/boards/create`;
  console.log(values);
  // let response = await axiosClient({ method: "POST", url: URL });
  // console.log(response.data);
  // return response.data;
});

const dataSlice = createSlice({
  name: "data",
  initialState: { loading: false, backgrounds: false, boards: { sampleBoard: {} } },
  reducers: {},
  extraReducers: {
    [getBGs.pending]: (state, action) => {
      state.loading = true;
    },
    [getBGs.rejected]: (state, action) => {
      state.loading = false;
    },
    [getBGs.fulfilled]: (state, action) => {
      state.backgrounds = action.payload.results;
      console.log("GETBGS/STATE:", current(state));
      state.loading = false;
    },
    [getBoards.pending]: (state, action) => {
      state.loading = true;
    },
    [getBoards.rejected]: (state, action) => {
      state.loading = false;
    },
    [getBoards.fulfilled]: (state, action) => {
      state.boards = action.payload;
      console.log("GETBOARDS/STATE:", current(state));
      state.loading = false;
    },
  },
});

export { getBGs, getBoards, createBoard };

export default dataSlice.reducer;
