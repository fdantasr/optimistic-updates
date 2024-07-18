import { useMutationState } from "@tanstack/react-query";
import { useUpdateUser } from "../../app/hooks/useUpdateUser";
import { useUsers } from "../../app/hooks/useUsers";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";
import { Switch } from "./ui/switch";
import { CREATE_USER_MUTATION_KEY } from "../../app/hooks/useCreateUser";
import { IUser } from "../../app/types/IUser";

export function UsersList() {
  const { users, isLoading } = useUsers();
  const { updateUser } = useUpdateUser();

  async function handleBlocedChange(id: string, blocked: boolean) {
    await updateUser({ id, blocked });
  }

  return (
    <div className=" space-y-4">
      {isLoading && (
        <>
          <Skeleton className="h-[74px]" />
          <Skeleton className="h-[74px]" />
          <Skeleton className="h-[74px]" />
          <Skeleton className="h-[74px]" />
          <Skeleton className="h-[74px]" />
        </>
      )}
      {users.map((user) => (
        <div
          key={user.id}
          className=" p-4 border rounded-md flex items-center justify-between "
        >
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={`https://github.com/${user.username}.png`} />
              <AvatarFallback>{user.name}</AvatarFallback>
            </Avatar>
            <div>
              <strong className="block leading-4 text-lg">{user.name}</strong>
              <small className="text-muted-foreground">@{user.username}</small>
            </div>
          </div>
          <Switch
            checked={user.blocked}
            onCheckedChange={(blockedParam) =>
              handleBlocedChange(user.id, blockedParam)
            } //função de callback com o parametro blockedParam inferido
          />
        </div>
      ))}
    </div>
  );
}
