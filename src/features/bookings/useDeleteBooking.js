import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

// api services
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";

function useDeletebooking() {
  const queryClient = useQueryClient();

  const { mutate: deleteBooking, isLoading: isDeleting } = useMutation({
    mutationFn: (bookingId) => deleteBookingApi(bookingId),
    onSuccess: () => {
      toast.success(`Booking successfully deleted`);
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: () => {
      toast.error("Failure deleting booking");
    },
  });

  return { deleteBooking, isDeleting };
}

export default useDeletebooking;
