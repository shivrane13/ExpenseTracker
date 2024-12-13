import { configureStore } from "@reduxjs/toolkit";
import incomeSlice from "./features/income/incomeSlice";
import expenseSlice from "./features/Expense/expenseSlice";
import userSlice from "./features/Authentication/userSlice";

const store = configureStore({
  reducer: {
    income: incomeSlice,
    expense: expenseSlice,
    user: userSlice,
  },
});

export default store;
