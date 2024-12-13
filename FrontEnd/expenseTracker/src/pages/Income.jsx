import { useSelector } from "react-redux";
import IncomeForm from "../features/income/IncomeForm";
import styled from "styled-components";
import IncomeItem from "../features/income/IncomeItem";
import { getTotalIncome } from "../features/income/incomeSlice";
import Spinner from "../ui/Spinner";

function Income() {
  const incomes = useSelector((state) => state.income.income);
  const totalIncome = useSelector(getTotalIncome);
  const isLoading = useSelector((state) => state.income.isLoading);
  return (
    <IncomeStyled>
      <InnerLayout>
        <h1>Incomes</h1>
        <h2 className="total-income">
          Total Income: <span>${totalIncome}</span>
        </h2>
        <div className="income-content">
          <div className="form-container">
            <IncomeForm />
          </div>
          <IncomeItems className="incomes">
            {isLoading ? (
              <Spinner />
            ) : (
              incomes.map((income) => (
                <IncomeItem income={income} key={income.id} />
              ))
            )}
          </IncomeItems>
        </div>
      </InnerLayout>
    </IncomeStyled>
  );
}

const InnerLayout = styled.div`
  padding: 2rem 1.5rem;
  width: 100%;
`;

const IncomeStyled = styled.div`
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
      color: var(--color-green);
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
const IncomeItems = styled.div`
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
export default Income;
