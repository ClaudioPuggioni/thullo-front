import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axiosClient, { BASE_URL } from "../apiConfig";

const getBGs = createAsyncThunk("data/getBGs", async () => {
  const query = "wallpaper";
  let URL = `https://api.unsplash.com/search/photos?client_id=56p71PWCNpxHLfx1glbJg94czzJKzQfmDmoykqYcYic&query=${query}&per_page=4"`;
  let response = await axiosClient({ method: "GET", url: URL });
  console.log(response.data);
  return response.data;
});

const getBoards = createAsyncThunk("data/getBoards", async (userId) => {
  const URL = `${BASE_URL}/board`;
  let response = await axiosClient({ method: "GET", url: URL });
  response.data.userId = userId;
  console.log("GETBOARDS/response.data:", response.data);
  return response.data;
});

const createBoard = createAsyncThunk("data/createBoard", async (values) => {
  const URL = `${BASE_URL}/board/create`;
  let response = await axiosClient({ method: "POST", url: URL, data: values });
  return response.data;
});

const getSingleBoard = createAsyncThunk("data/getSingleBoard", async (boardId) => {
  const URL = `${BASE_URL}/board/${boardId}`;
  let response = await axiosClient({ method: "GET", url: URL });
  return response.data;
});

const addMember = createAsyncThunk("data/addMember", async (values) => {
  const URL = `${BASE_URL}/board/member/add`;

  try {
    let response = await axiosClient({ method: "POST", url: URL, data: values });
    console.log("addMember/RESPONSE.DATA:", response.data);
    return response.data;
  } catch (err) {
    if (err.response) {
      // Request made, server responded
      console.log("ERR.RESPONSE:");
      alert(`ERROR-${err.response.status}: ${err.response.data}`);
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    } else if (err.request) {
      // Request made, no response received
      console.log("ERR.REQUEST:");
      console.log(err.request);
    } else {
      // Error triggered in response setup
      console.log("ERR.REQUEST/FAIL:");
      console.log(err.message);
    }
  }
});

const delMember = createAsyncThunk("data/delMember", async (values) => {
  const URL = `${BASE_URL}/board/member/del`;

  try {
    let response = await axiosClient({ method: "POST", url: URL, data: values });
    console.log("delMember/RESPONSE.DATA:", response.data);
    return response.data;
  } catch (err) {
    if (err.response) {
      // Request made, server responded
      console.log("ERR.RESPONSE:");
      alert(`ERROR-${err.response.status}: ${err.response.data}`);
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    } else if (err.request) {
      // Request made, no response received
      console.log("ERR.REQUEST:");
      console.log(err.request);
    } else {
      // Error triggered in response setup
      console.log("ERR.REQUEST/FAIL:");
      console.log(err.message);
    }
  }
});

const visibility = createAsyncThunk("data/visibility", async (boardId) => {
  const URL = `${BASE_URL}/board/visibility`;
  // let response = await axiosClient({ method: "POST", url: URL });
  // console.log("visibility/RESPONSE.DATA:", response.data);
  // return response.data;
});

const dataSlice = createSlice({
  name: "data",
  initialState: { loading: false, backgrounds: false, boards: {}, currBoard: false },
  reducers: {
    clearCabinet: (state, action) => {
      state.backgrounds = false;
      state.boards = {};
    },
  },
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
      state.boards = {};
      for (const board of action.payload) {
        if (board.admin === action.payload.userId) state.boards[board._id] = board;
      }
      console.log("GETBOARDS/STATE:", current(state));
      state.loading = false;
    },
    [getSingleBoard.pending]: (state, action) => {
      state.loading = true;
    },
    [getSingleBoard.rejected]: (state, action) => {
      state.loading = false;
    },
    [getSingleBoard.fulfilled]: (state, action) => {
      state.currBoard = false;
      state.currBoard = action.payload;
      console.log("GETSINGLEBOARD/STATE:", current(state));
      state.loading = false;
    },
    [addMember.pending]: (state, action) => {
      state.loading = true;
    },
    [addMember.rejected]: (state, action) => {
      state.loading = false;
    },
    [addMember.fulfilled]: (state, action) => {
      alert(action.payload);
      state.loading = false;
    },
  },
});

export { getBGs, getBoards, createBoard, getSingleBoard, addMember, delMember };

export const { clearCabinet } = dataSlice.actions;

export default dataSlice.reducer;
