import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

// api services
import { signUp as signUpApi } from "../../services/apiAuth";

export function useSignup() {
  const { mutate: signUp, isLoading: isSigningUp } = useMutation({
    mutationFn: ({ email, password }) => signUpApi({ email, password }),
    onSuccess: (data) => {
      console.log("USER ADD RES --->", data);
      toast.success("User signed up sucessfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { signUp, isSigningUp };
}
