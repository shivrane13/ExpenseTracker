import styled from "styled-components";
import Button from "../../ui/Button"; // Assuming Button component is reusable
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./userSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errorMessage = useSelector((state) => state.user.error);

  const onSubmit = async (data) => {
    dispatch(loginUser(data));
    reset();
    navigate("/");
  };

  return (
    <LoginStyled onSubmit={handleSubmit(onSubmit)}>
      {errorMessage && <div className="error">{errorMessage}</div>}
      <h2>Login Form</h2>
      <div className="input-control">
        <input
          type="text"
          placeholder="Username"
          {...register("username", { required: true })}
        />
      </div>
      <div className="input-control">
        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />
      </div>
      <div className="submit-btn">
        <Button
          name={"Login"}
          bPad={".8rem 1.6rem"}
          bRad={"30px"}
          bg={"var(--color-accent)"}
          color={"#fff"}
        />
      </div>
    </LoginStyled>
  );
}

const LoginStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  max-width: 400px;
  margin: 0 auto;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

  .error {
    color: red;
    font-size: 1rem;
    text-align: center;
  }

  .input-control {
    input {
      width: 100%;
      font-family: inherit;
      font-size: inherit;
      outline: none;
      border: none;
      padding: 0.8rem 1.2rem;
      border-radius: 5px;
      border: 2px solid #ddd;
      background: transparent;
      color: rgba(34, 34, 96, 0.9);
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);

      &::placeholder {
        color: rgba(34, 34, 96, 0.4);
      }
    }
  }

  .submit-btn {
    button {
      width: 100%;
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      &:hover {
        background: var(--color-green) !important;
      }
    }
  }
`;

export default Login;
