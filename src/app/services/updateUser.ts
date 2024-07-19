import { sleep } from "../libs/utils";
import { IUser } from "../types/IUser";

type IUpdateUserDTO = Partial<Omit<IUser, "id">> & { id: string };  //trasnsforma todos os campos de IUser em opcionais, exceto o id

export async function updateUser({
  name,
  username,
  blocked,
  id,
}: IUpdateUserDTO) {
  await sleep();
  const response = await fetch(`http://localhost:3000/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      username,
      blocked,
    }),
  });
  const body = await response.json();

  return body as IUser;
}
