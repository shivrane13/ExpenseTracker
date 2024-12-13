import { useForm } from "react-hook-form";
import styled from "styled-components";
import { plus } from "../../ui/Icon";

import "react-datepicker/dist/react-datepicker.css";
import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { addIncomeAsync } from "./incomeSlice";

const FormStyled = styled.form`
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

function IncomeForm() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  function onSubmit(data) {
    const { title, amount, category } = data;
    if (title && amount && category) {
      data = { ...data, amount: parseInt(amount), date: Date.now() };
      dispatch(addIncomeAsync(data));
      reset();
    }
  }

  return (
    <FormStyled onSubmit={handleSubmit(onSubmit)}>
      {errors.title || errors.amount || errors.category ? (
        <ErrorMessage>All Filed are required</ErrorMessage>
      ) : (
        ""
      )}
      <div className="input-control">
        <input
          type="text"
          id="title"
          placeholder="Salary Title"
          {...register("title", { required: "Title is Require" })}
        />
      </div>
      <div className="input-control">
        <input
          type="text"
          id={"amount"}
          placeholder={"Salary Amount"}
          {...register("amount", { required: "Title is Require" })}
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
          <option value="salary">Salary</option>
          <option value="freelancing">Freelancing</option>
          <option value="investments">Investiments</option>
          <option value="stocks">Stocks</option>
          <option value="bitcoin">Bitcoin</option>
          <option value="bank">Bank Transfer</option>
          <option value="youtube">Youtube</option>
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
          name={"Add Income"}
          icon={plus}
          bPad={".8rem 1.6rem"}
          bRad={"30px"}
          bg={"var(--color-accent"}
          color={"#fff"}
        />
      </div>
    </FormStyled>
  );
}

export default IncomeForm;
