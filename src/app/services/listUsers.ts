import { sleep } from "../libs/utils";
import { IUser } from "../types/IUser";

export async function listUsers() {
  await sleep();
  const response = await fetch("http://localhost:3000/users");
  const body = await response.json();
  return body as IUser[];
}

//Using Generics
// export async function listUsers():Promise<IUser[]> => {
//   await sleep();
//   const response = await fetch("http://localhost:3000/users");
//   return await response.json();
// }
