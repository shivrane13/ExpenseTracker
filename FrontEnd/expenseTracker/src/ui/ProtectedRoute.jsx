import axios from "../services/AxiosConfig";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../features/Authentication/userSlice";
import { getIncomeData } from "../features/income/incomeSlice";
import { getExpenseData } from "../features/Expense/expenseSlice";

function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(
    function () {
      async function getLogedInUser() {
        try {
          const res = await axios.get("http://localhost:3000/user/logedinuser");
          dispatch(setUser(res.data));
          if (!res.data.isAuth) {
            navigate("/login");
          }
        } catch (error) {
          console.log(error);
        }
      }

      getLogedInUser();
    },
    [navigate]
  );

  //use effect for Income
  useEffect(function () {
    dispatch(getIncomeData());
  }, []);

  //useeffect for expnse
  useEffect(function () {
    dispatch(getExpenseData());
  }, []);

  return <>{children}</>;
}

export default ProtectedRoute;
