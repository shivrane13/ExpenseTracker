import styled from "styled-components";
import ExpenseForm from "../features/Expense/ExpenseForm";
import IncomeItem from "../features/income/IncomeItem";
import { useSelector } from "react-redux";
import { getTotalExpense } from "../features/Expense/expenseSlice";
import Spinner from "../ui/Spinner";

function Expense() {
  const expenses = useSelector((state) => state.expense.expense);
  const isLoading = useSelector((state) => state.expense.isLoading);
  const totalExpense = useSelector(getTotalExpense);
  console.log(expenses);
  return (
    <ExpenseStyled>
      <InnerLayout>
        <h1>Expenses</h1>
        <h2 className="total-income">
          Total Expense: <span>${totalExpense}</span>
        </h2>
        <div className="income-content">
          <div className="form-container">
            <ExpenseForm />
          </div>
          {isLoading ? (
            <Spinner />
          ) : (
            <ExpenseItems className="incomes">
              {expenses.map((exp) => (
                <IncomeItem income={exp} key={exp.id} />
              ))}
            </ExpenseItems>
          )}
        </div>
      </InnerLayout>
    </ExpenseStyled>
  );
}

const InnerLayout = styled.div`
  padding: 2rem 1.5rem;
  width: 100%;
`;

const ExpenseStyled = styled.div`
  display: flex;
  overflow: auto;
  .total-income {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fcf6f9;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin: 1rem 0;
    font-size: 2rem;
    gap: 0.5rem;
    span {
      font-size: 2.5rem;
      font-weight: 800;
      color: red;
    }
  }
  .income-content {
    display: flex;
    gap: 2rem;
    .incomes {
      flex: 1;
    }
  }
`;

const ExpenseItems = styled.div`
  height: 35rem;
  overflow-y: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;
export default Expense;
