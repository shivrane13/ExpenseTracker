import styled from "styled-components";
import Button from "../../ui/Button"; // Assuming Button component is reusable
import { useForm } from "react-hook-form";
import axios from "../../services/AxiosConfig";

import { useState } from "react";

function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await axios.post("http://localhost:3000/user/createuser", data);
      reset();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const password = watch("password", "");

  return (
    <SignupStyled onSubmit={handleSubmit(onSubmit)}>
      <h2>Signup Form</h2>
      <div className="input-control">
        <input
          type="text"
          placeholder="Username"
          {...register("username", { required: "Username is required" })}
        />
        {errors.username && (
          <span className="error">{errors.username.message}</span>
        )}
      </div>

      <div className="input-control">
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <span className="error">{errors.email.message}</span>}
      </div>

      <div className="input-control">
        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
          })}
        />
        {errors.password && (
          <span className="error">{errors.password.message}</span>
        )}
      </div>

      <div className="input-control">
        <input
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) => value === password || "Passwords don't match",
          })}
        />
        {errors.confirmPassword && (
          <span className="error">{errors.confirmPassword.message}</span>
        )}
      </div>

      <div className="submit-btn">
        <Button
          name={"Sign Up"}
          bPad={".8rem 1.6rem"}
          bRad={"30px"}
          bg={"var(--color-accent)"}
          color={"#fff"}
          isLoading={isLoading}
        />
      </div>
    </SignupStyled>
  );
}

const SignupStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  max-width: 400px;
  margin: 0 auto;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

  .input-control {
    position: relative;

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

    .error {
      position: absolute;
      bottom: -1.5rem;
      left: 0;
      color: red;
      font-size: 0.8rem;
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

export default Signup;
