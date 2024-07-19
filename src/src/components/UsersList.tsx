import { useUpdateUser } from "../../app/hooks/useUpdateUser";
import { useUsers } from "../../app/hooks/useUsers";
import { cn } from "../../app/libs/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";
import { Switch } from "./ui/switch";

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
          className={cn(
            " p-4 border rounded-md flex items-center justify-between ",
            user.status === "pending" && "opacity-70",
            user.status === "error" && "destructive bg-destructive/10"
          )}
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
            disabled={user.status === "pending" || user.status === "error"}
            onCheckedChange={(blockedParam) =>
              handleBlocedChange(user.id, blockedParam)
            } //função de callback com o parametro blockedParam inferido
          />
        </div>
      ))}
    </div>
  );
}
