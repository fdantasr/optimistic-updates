import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "../services/createUser";
import { USERS_QUERY_KEY } from "./useUsers";
import { IUser } from "../types/IUser";

export const CREATE_USER_MUTATION_KEY = ["createUser"];

export function useCreateUser() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: CREATE_USER_MUTATION_KEY,
    mutationFn: createUser,

    //executa assim que chamo mutateAsync, ou seja antes da promise ser resolvida
    onMutate: (variables) => {
      const tmpUserId = String(Math.random());

      queryClient.setQueryData<IUser[]>(USERS_QUERY_KEY, (old) =>
        //pega o array e concatena com o novo usuário no cache
        old?.concat({
          ...variables,
          id: tmpUserId,
        })
      );
      return { tmpUserId };
    },

    onSuccess: (data, _variables, context) => {
      queryClient.setQueryData<IUser[]>(USERS_QUERY_KEY, (old) =>
        old?.map((user) => (user.id === context.tmpUserId ? data : user))
      );
    },

    onError: (_error, _variables, context) => {
      queryClient.setQueryData<IUser[]>(USERS_QUERY_KEY, (old) =>
        old?.filter((user) => user.id !== context?.tmpUserId)
      );
    },

    //ela espera a promise ser resolvida para executar, bom pra quando n tenho o objeto de retorno
    // onSuccess: () => {
    //   queryClient.invalidateQueries({
    //     queryKey: USERS_QUERY_KEY,
    //   });
    // },
  });

  return {
    createUser: mutateAsync,
    isLoading: isPending,
  };
}
