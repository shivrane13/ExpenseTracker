import { useSelector } from "react-redux";
import styled from "styled-components";
import IncomeItem from "../income/IncomeItem";
import Spinner from "../../ui/Spinner";

function History({ isDashbord }) {
  const incomes = useSelector((state) => state.income.income);
  const expenses = useSelector((state) => state.expense.expense);
  const isLoadingIncome = useSelector((state) => state.income.isLoading);
  const isLoadingExpense = useSelector((state) => state.expense.isLoading);

  if (isLoadingExpense || isLoadingIncome) {
    return <Spinner />;
  }

  var data = [...incomes, ...expenses];

  var history = data.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();

    return dateB - dateA;
  });
  if (isDashbord) {
    history = history.slice(0, 3);
  }

  return (
    <HistoryStyled>
      <h2>Recent History</h2>

      {isDashbord ? (
        history.map((item) => {
          const { id, title, amount, type } = item;
          return (
            <div key={id} className="history-item">
              <p
                style={{
                  color: type === "expense" ? "red" : "var(--color-green)",
                }}
              >
                {title}
              </p>

              <p
                style={{
                  color: type === "expense" ? "red" : "var(--color-green)",
                }}
              >
                {type === "expense"
                  ? `-${amount <= 0 ? 0 : amount}`
                  : `+${amount <= 0 ? 0 : amount}`}
              </p>
            </div>
          );
        })
      ) : (
        <HistoryUL>
          {history.map((item) => (
            <IncomeItem income={item} key={item.date} isHistory={true} />
          ))}
        </HistoryUL>
      )}
    </HistoryStyled>
  );
}

const HistoryStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .history-item {
    background: #fcf6f9;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const HistoryUL = styled.ul`
  height: 50rem;
  overflow: scroll;

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

export default History;
