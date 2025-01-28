// custom hooks
import useCheckout from "./useCheckout";
// components
import Button from "../../ui/Button";

function CheckoutButton({ bookingId }) {
  const { checkOut, isCheckingOut } = useCheckout();

  // event handlers
  function handleButtonClick() {
    if (bookingId) checkOut(bookingId);
  }

  return (
    <Button
      disabled={isCheckingOut}
      onClick={handleButtonClick}
      variation="primary"
      size="small"
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
