import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchApi = createAsyncThunk("fetchApi", async () => {
  const response = await fetch("http://localhost:8080/api/v1/user");
  const result = await response.json();
  return result;
});

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const ApiSlice = createSlice({
  name: "apidata",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApi.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchApi.fulfilled, (state, action) => {
        state.loading = false;
        console.log("succesful", action.payload.data);
        state.data = action.payload.data;
      })
      .addCase(fetchApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default ApiSlice.reducer;
