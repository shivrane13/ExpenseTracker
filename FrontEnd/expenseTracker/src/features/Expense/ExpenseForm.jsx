import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../../ui/Button";
import { plus } from "../../ui/Icon";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addExpenseAsync } from "./expenseSlice";

function ExpenseForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const dispatch = useDispatch();

  function onSubmit(data) {
    const { title, amount, category } = data;
    if (title && amount && category) {
      data = { ...data, amount: parseInt(amount), date: Date.now() };
      dispatch(addExpenseAsync(data));
      reset();
    }
  }

  return (
    <ExpenseFormStyled onSubmit={handleSubmit(onSubmit)}>
      {errors.title ||
      errors.amount ||
      errors.category ||
      errors.description ? (
        <ErrorMessage>All Fileds are Requiered</ErrorMessage>
      ) : (
        ""
      )}
      <div className="input-control">
        <input
          type="text"
          placeholder="Expense Title"
          {...register("title", { required: "Title is Require" })}
        />
      </div>
      <div className="input-control">
        <input
          type="text"
          placeholder={"Expense Amount"}
          {...register("amount", { required: "Title is Require " })}
        />
      </div>

      <div className="selects input-control">
        <select
          required
          id="category"
          {...register("category", { required: "Title is Require" })}
        >
          <option value="" disabled>
            Select Option
          </option>
          <option value="education">Education</option>
          <option value="groceries">Groceries</option>
          <option value="health">Health</option>
          <option value="subscriptions">Subscriptions</option>
          <option value="takeaways">Takeaways</option>
          <option value="clothing">Clothing</option>
          <option value="travelling">Travelling</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="input-control">
        <textarea
          placeholder="Add A Reference"
          id="description"
          cols="30"
          rows="4"
          {...register("description")}
        ></textarea>
      </div>
      <div className="submit-btn">
        <Button
          name={"Add Expense"}
          icon={plus}
          bPad={".8rem 1.6rem"}
          bRad={"30px"}
          bg={"var(--color-accent"}
          color={"#fff"}
        />
      </div>
    </ExpenseFormStyled>
  );
}

const ExpenseFormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  input,
  textarea,
  select {
    font-family: inherit;
    font-size: inherit;
    outline: none;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: 2px solid #fff;
    background: transparent;
    resize: none;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    color: rgba(34, 34, 96, 0.9);
    &::placeholder {
      color: rgba(34, 34, 96, 0.4);
    }
  }
  .input-control {
    input {
      width: 100%;
    }
  }

  .selects {
    display: flex;
    justify-content: flex-end;
    select {
      color: rgba(34, 34, 96, 0.4);
      &:focus,
      &:active {
        color: rgba(34, 34, 96, 1);
      }
    }
  }

  .submit-btn {
    button {
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      &:hover {
        background: var(--color-green) !important;
      }
    }
  }
`;

const ErrorMessage = styled.p`
  text-align: center;
  color: red;
  font-size: 1rem;
`;
export default ExpenseForm;
