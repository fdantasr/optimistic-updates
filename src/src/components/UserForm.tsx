import React from "react";
import { useCreateUser } from "../../app/hooks/useCreateUser";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { create } from "domain";
import { toast } from "sonner";

export function UserForm() {
  const [name, setName] = React.useState("");
  const [username, setUsername] = React.useState("");

  const { newUser, isLoading } = useCreateUser();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setName("");
      setUsername("");
      
      await newUser({
        name,
        username,
        blocked: false,
      });
      // toast.success("Usuário cadastrado com sucesso!");
    } catch {
      toast.error("Erro ao cadastrar usuário!");
    }
  }
  return (
    <form onSubmit={handleSubmit} className=" bg-muted/50 p-4 rounded-md">
      <div className="flex items-center gap-3">
        <Input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Nome do usuário"
          // disabled={isLoading} //Nao precisa na UI otimista
        />
        <Input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="@ no github"
          // disabled={isLoading}
        />
      </div>
      <Button className="mt-3 w-full" type="submit">
        Cadastrar
      </Button>
    </form>
  );
}
