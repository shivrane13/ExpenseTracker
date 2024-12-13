import { createSlice } from "@reduxjs/toolkit";
import axios from "../../services/AxiosConfig";

const initialState = {
  income: [],
  isLoading: false,
};

const incomeSlice = createSlice({
  name: "income",
  initialState: initialState,
  reducers: {
    addIncome(state, action) {
      if (Array.isArray(action.payload)) {
        state.income = action.payload;
      } else {
        state.income.unshift(action.payload);
        //getIncomeData();
      }
    },
    isLoading(state, action) {
      state.isLoading = action.payload;
    },
    deleteIncome(state, action) {
      console.log(action.payload);
      state.income = state.income.filter((ele) => ele.id !== action.payload);
    },
  },
});

export const { addIncome, isLoading, deleteIncome } = incomeSlice.actions;

export function getIncomeData() {
  return async function (dispatch) {
    dispatch(isLoading(true));

    try {
      const IncomeData = await axios.get(
        "http://localhost:3000/income/getincome"
      );
      dispatch(addIncome(IncomeData.data));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(isLoading(false));
    }
  };
}

export function addIncomeAsync(data) {
  return async function (dispatch) {
    dispatch(isLoading(true));
    try {
      const res = await axios.post(
        "http://localhost:3000/income/addincome",
        data
      );
      //console.log(res.data);
      dispatch(addIncome(res.data));
    } catch (err) {
      console.log(err.response);
    } finally {
      dispatch(isLoading(false));
    }
  };
}

export function deleteIncomeAsync(id) {
  return async function (dispatch) {
    try {
      dispatch(deleteIncome(id));
      await axios.post(`http://localhost:3000/income/deleteincome/${id}`);
    } catch (error) {
      console.log(error);
    }
  };
}

export const getTotalIncome = (state) =>
  state.income.income.reduce((sum, item) => sum + item.amount, 0);

export default incomeSlice.reducer;
