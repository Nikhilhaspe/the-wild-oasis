import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

// api services
import { updateBooking } from "../../services/apiBookings";

function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkOut, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`);
      queryClient.invalidateQueries({ active: true });
    },
  });

  return { checkOut, isCheckingOut };
}

export default useCheckout;
