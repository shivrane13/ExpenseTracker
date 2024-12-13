import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
import axios from "../../services/AxiosConfig";

const initialState = {
  expense: [],
  isLoading: false,
};

const expenseSlice = createSlice({
  name: "expense",
  initialState: initialState,
  reducers: {
    addExpense(state, action) {
      if (Array.isArray(action.payload)) {
        state.expense = action.payload;
      } else {
        state.expense.unshift({ ...action.payload, type: "expense" });
      }
    },
    isLoading(state, action) {
      state.isLoading = action.payload;
    },
    deleteExpense(state, action) {
      state.expense = state.expense.filter((exp) => exp.id !== action.payload);
    },
  },
});

export const { addExpense, isLoading, deleteExpense } = expenseSlice.actions;

export function getExpenseData() {
  return async function (dispatch) {
    dispatch(isLoading(true));
    try {
      const res = await axios.get("http://localhost:3000/expense/getexpense");
      dispatch(addExpense(res.data));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(isLoading(false));
    }
  };
}

export function addExpenseAsync(data) {
  return async function (dispatch) {
    dispatch(isLoading(true));
    try {
      const res = await axios.post(
        "http://localhost:3000/expense/addexpense",
        data
      );
      dispatch(addExpense(res.data));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(isLoading(false));
    }
  };
}

export function deleteExpenseAsync(id) {
  return async function (dispatch) {
    try {
      dispatch(isLoading(true));
      dispatch(deleteExpense(id));
      const res = await axios.post(
        `http://localhost:3000/expense/deleteexpense/${id}`
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(isLoading(false));
    }
  };
}

export const getTotalExpense = (state) =>
  state.expense.expense.reduce((sum, item) => sum + item.amount, 0);

export default expenseSlice.reducer;
