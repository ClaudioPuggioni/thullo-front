import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axiosClient from "../apiConfig";

const getBGs = createAsyncThunk("data/getBGs", async () => {
  const query = "wallpaper";
  let API_URL = `https://api.unsplash.com/search/photos?client_id=56p71PWCNpxHLfx1glbJg94czzJKzQfmDmoykqYcYic&query=${query}&per_page=4"`;
  let response = await axiosClient({ method: "GET", url: API_URL });
  console.log(response.data);
  return response.data;
});

const dataSlice = createSlice({
  name: "data",
  initialState: { loading: false, backgrounds: false },
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
  },
});

export { getBGs };

export default dataSlice.reducer;
