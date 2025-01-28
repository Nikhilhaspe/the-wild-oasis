import { HiArrowRightOnRectangle } from "react-icons/hi2";

// components
import SpinnerMini from "../../ui/SpinnerMini";
import ButtonIcon from "../../ui/ButtonIcon";

// custom hooks
import { useLogout } from "./useLogout";

function Logout() {
  const { isLoading, logout } = useLogout();

  return (
    <ButtonIcon onClick={logout} disabled={isLoading}>
      {isLoading ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
    </ButtonIcon>
  );
}

export default Logout;
