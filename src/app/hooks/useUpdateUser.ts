import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../services/updateUser";
import { USERS_QUERY_KEY } from "./useUsers";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: USERS_QUERY_KEY,
      });
    },
  });
  return { updateUser: mutateAsync, isPending };
}
