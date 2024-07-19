import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "../services/createUser";
import { USERS_QUERY_KEY, UsersQueryData } from "./useUsers";

export const CREATE_USER_MUTATION_KEY = ["createUser"];

export function useCreateUser() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: CREATE_USER_MUTATION_KEY,
    mutationFn: createUser,

    //executa assim que chamo mutateAsync, ou seja antes da promise ser resolvida (mutationFn)
    onMutate: (variables) => {
      const tmpUserId = String(Math.random());

      queryClient.setQueryData<UsersQueryData>(USERS_QUERY_KEY, (old) =>
        //pega o array e concatena com o novo usuário no cache
        old?.concat({
          ...variables,
          id: tmpUserId,
          status: "pending",
        })
      );
      return { tmpUserId };
    },

    //Cmpara o id de cada user no cache com o tmpUserId armazenado no context
    onSuccess: async (data, _variables, context) => {
      await queryClient.cancelQueries({ queryKey: USERS_QUERY_KEY });
      queryClient.setQueryData<UsersQueryData>(USERS_QUERY_KEY, (old) =>
        old?.map((user) => (user.id === context.tmpUserId ? data : user))
      );
    },


    //RollBack: remove o usuário com o tmpUserId do cache, pois a criação do usuário real falhou.
    //OPÇÃO 1  - SÓ REMOVE O ITEM DA LISTA
    // onError: async (_error, _variables, context) => {
    //   await queryClient.cancelQueries({ queryKey: USERS_QUERY_KEY });

    //   queryClient.setQueryData<UsersQueryData>(USERS_QUERY_KEY, (old) =>
    //     old?.filter((user) => user.id !== context?.tmpUserId)
    //   );
    // },

    //OPÇÃO 2 - MANTEM NA LISTA COM STATUS ERROR
    onError: async (_error, _variables, context) => {
      await queryClient.cancelQueries({ queryKey: USERS_QUERY_KEY });
      queryClient.setQueryData<UsersQueryData>(USERS_QUERY_KEY, (old) =>
        old?.map((user) =>
          user.id === context?.tmpUserId ? { ...user, status: "error" } : user
        )
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
