import styled from "styled-components";

// componentw
// styled CC
const StyledLogo = styled.div`
  text-align: center;
`;
const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

// custom hooks
import { useDarkMode } from "../contexts/DarkModeContext";

function Logo() {
  const { isDarkMode } = useDarkMode();

  const imageSrc = isDarkMode ? "logo-dark.png" : "logo-light.png";

  return (
    <StyledLogo>
      <Img src={imageSrc} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
