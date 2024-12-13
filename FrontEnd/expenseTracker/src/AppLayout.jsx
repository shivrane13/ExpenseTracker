import styled from "styled-components";
import { Outlet } from "react-router-dom";
import SideBar from "./ui/SideBar";
export const MainLayout = styled.div`
  padding: 2rem;
  height: 100%;
  display: flex;
  gap: 2rem;
`;

export const InnerLayout = styled.div`
  padding: 2rem 1.5rem;
  width: 100%;
`;

const AppStyled = styled.div`
  height: 100vh;
  background-image: "src\assets\bg.png";
  position: relative;
  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

function AppLayout() {
  return (
    <AppStyled>
      <MainLayout>
        <SideBar />
        <InnerLayout>
          <Outlet />
        </InnerLayout>
      </MainLayout>
    </AppStyled>
  );
}

export default AppLayout;
