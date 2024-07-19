import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../services/updateUser";
import { USERS_QUERY_KEY } from "./useUsers";
import { IUser } from "../types/IUser";
import { toast } from "sonner";

//Preciso conseguir alterar qualquer coisa do usuário
export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateUser,
    //indepente de onde eu chame o updateUser, ele vai atualizar a lista de usuários
    // onSuccess: () => {
    //   queryClient.invalidateQueries({
    //     queryKey: USERS_QUERY_KEY,
    //   });
    // },

    //Assim não preciso invalidar a query, pois o próprio mutateAsync já faz isso
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: USERS_QUERY_KEY });
      const previousUsers = queryClient.getQueryData<IUser[]>(USERS_QUERY_KEY);
      queryClient.setQueryData<IUser[]>(USERS_QUERY_KEY, (old) =>
        old?.map((user) =>
          user.id === variables.id ? { ...user, ...variables } : user
        )
      );
      return { previousUsers };
    },
    onError: async (_error, _variables, context) => {
      await queryClient.cancelQueries({ queryKey: USERS_QUERY_KEY });
      queryClient.setQueryData<IUser[]>(
        USERS_QUERY_KEY,
        context?.previousUsers
      );
      toast.error("Erro ao atualizar usuário!");
    },
  });
  return { updateUser: mutateAsync, isPending };
}
