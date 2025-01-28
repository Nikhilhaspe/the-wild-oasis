import { Outlet } from "react-router-dom";
import styled from "styled-components";

// components
import Sidebar from "./Sidebar";
import Header from "./Header";
// styled CC
const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;
const StyledMain = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;
`;
const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />

      <StyledMain>
        <Container>
          <Outlet />
        </Container>
      </StyledMain>
    </StyledAppLayout>
  );
}

export default AppLayout;
