import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice"
import paymentReducer from "./features/payment/paymentSlice"
import userReducer from "./features/user/userSlice"

export const store = configureStore({
  reducer: {
    counterState: counterReducer,
    paymentState: paymentReducer,
    userState: userReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type ReduxStore = {
  getState: () => RootState;
  dispatch: AppDispatch;
};