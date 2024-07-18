import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "../services/createUser";
import { USERS_QUERY_KEY } from "./useUsers";
import { Variable } from "lucide-react";
import { IUser } from "../types/IUser";

export const CREATE_USER_MUTATION_KEY = ["createUser"];

export function useCreateUser() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: CREATE_USER_MUTATION_KEY,
    mutationFn: createUser,

    onMutate: (variables) => {
      queryClient.setQueryData<IUser[]>(USERS_QUERY_KEY, (old) =>
        old?.concat({
          ...variables,
          id: String(Math.random()),
        })
      );
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: USERS_QUERY_KEY,
      });
    },
  });

  return {
    newUser: mutateAsync,
    isLoading: isPending,
  };
}
