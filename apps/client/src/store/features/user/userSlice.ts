import { dashBoardDataType } from "@/types/user.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  walletBalance: 0,
  bankBalance: 0
};

const userSlice = createSlice({
  name: "userState",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<dashBoardDataType>) => {
      state.name = action.payload.name,
      state.email = action.payload.email,
      state.walletBalance = action.payload.walletBalance,
      state.bankBalance = action.payload.bankBalance
    }
  }
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;