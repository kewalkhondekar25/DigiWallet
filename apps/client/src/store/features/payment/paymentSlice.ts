import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Recipent = {
  name: string
}

const initialState = {
  name: "",
}

const paymentSlice = createSlice({
  name: "paymentState",
  initialState,
  reducers: {
    payTo: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    }
  }
});

export const { payTo } = paymentSlice.actions;
export default paymentSlice.reducer;