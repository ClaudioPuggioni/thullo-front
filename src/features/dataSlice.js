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

// http://localhost:8000/board/addlist
const createList = createAsyncThunk("board/addlist", async (values) => {
  const URL = `${BASE_URL}/board/addlist`;

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
    alert(response.data.msg);
    return response.data.member;
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

const delMember = createAsyncThunk("data/delMember", async (values) => {
  const URL = `${BASE_URL}/board/member/del`;

  try {
    let response = await axiosClient({ method: "POST", url: URL, data: values });
    console.log("delMember/RESPONSE.DATA:", response.data);
    alert(response.data.msg);
    return response.data.member;
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

const visibility = createAsyncThunk("data/visibility", async (values) => {
  const URL = `${BASE_URL}/board/visibility`;

  try {
    let response = await axiosClient({ method: "POST", url: URL, data: values });
    console.log("visibility/RESPONSE.DATA:", response.data);
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
        // if (board.admin === action.payload.userId) {
        //   console.log(board.admin, action.payload.userId);
        //   console.log(board._id, action.payload.userId);
        //   state.boards[board._id] = board;
        // }
        if (board.members.includes(action.payload.userId)) state.boards[board._id] = board;
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
      state.currBoard.members = action.payload ? state.currBoard.members.concat(action.payload) : state.currBoard.members;
      console.log("ADDMEMBER/STATE:", current(state));
      state.loading = false;
    },
    [delMember.pending]: (state, action) => {
      state.loading = true;
    },
    [delMember.rejected]: (state, action) => {
      state.loading = false;
    },
    [delMember.fulfilled]: (state, action) => {
      state.currBoard.members = action.payload ? state.currBoard.members.filter((ele) => ele._id !== action.payload._id) : state.currBoard.members;
      console.log("DELMEMBER/STATE:", current(state));
      state.loading = false;
    },
    [visibility.pending]: (state, action) => {
      state.loading = true;
    },
    [visibility.rejected]: (state, action) => {
      state.loading = false;
    },
    [visibility.fulfilled]: (state, action) => {
      state.currBoard.active = action.payload.active;
      console.log("VISIBILITY/STATE:", current(state));
      state.loading = false;
    },
  },
});

export { getBGs, getBoards, createBoard, getSingleBoard, addMember, delMember, visibility, createList };

export const { clearCabinet } = dataSlice.actions;

export default dataSlice.reducer;
