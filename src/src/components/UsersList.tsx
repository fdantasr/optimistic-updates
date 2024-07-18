import { useUsers } from "../../app/hooks/useUsers";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";
import { Switch } from "./ui/switch";

export function UsersList() {
  const { users, isLoading } = useUsers();

  function handleBlocedChange(blocked: boolean) {
    console.log(blocked);
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
            // checked={user.blocked}
            onCheckedChange={handleBlocedChange}
          />
        </div>
      ))}
    </div>
  );
}
