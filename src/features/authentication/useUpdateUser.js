import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// api services
import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: ({ fullName, avatar, password }) =>
      updateCurrentUser({ fullName, avatar, password }),
    onSuccess: () => {
      toast.success("User account successfully updated");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return { updateUser, isUpdating };
}
