import { useMutation } from "@tanstack/react-query";
import { createUser } from "../services/createUser";

export function useCreateUser() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: createUser,
  });
  return { newUser: mutateAsync, isLoading: isPending };
}
