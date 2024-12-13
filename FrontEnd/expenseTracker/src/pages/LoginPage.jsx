import { Outlet, Link, useLocation } from "react-router-dom";
import styled from "styled-components";

function LoginPage() {
  const location = useLocation();

  return (
    <LoginPageStyled>
      <div className="slider-container">
        <div className="slider-btns">
          <Link
            to="/login"
            className={`slider-btn ${
              location.pathname === "/login" ? "active" : ""
            }`}
          >
            Login
          </Link>
          <Link
            to="/signup"
            className={`slider-btn ${
              location.pathname === "/signup" ? "active" : ""
            }`}
          >
            Signup
          </Link>
        </div>

        <div className="formElemts">
          <Outlet />
        </div>
      </div>
    </LoginPageStyled>
  );
}

const LoginPageStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;

  .formElemts {
    height: 45rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .slider-container {
    width: 90%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: white;
    border-radius: 10px;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    position: relative;
  }

  .slider-btns {
    display: flex;
    width: 100%;
    justify-content: space-around;
    background: var(--color-accent);
    padding: 1rem 0;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;

    .slider-btn {
      font-size: 1.2rem;
      font-weight: bold;
      color: white;
      text-decoration: none;
      padding: 0.5rem 1.5rem;
      cursor: pointer;
      transition: background 0.3s;
      &.active {
        background: #fff;
        color: var(--color-accent);
        border-radius: 5px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
      }

      &:hover {
        background: rgba(0, 0, 0, 0.1);
      }
    }
  }

  .slider-content {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 3rem;
    transition: transform 0.3s ease-in-out;
    position: relative;
    left: 0;
    z-index: 1;
  }

  .slider-content.signup {
    transform: translateX(100%);
  }
`;

export default LoginPage;
