import { GeneralApiProblem } from "./api-problem"

export interface User {
  id: number
  first_name: string
  email: string
  last_name:string
  avatar:string
}

//export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
//export type GetUserResult = { kind: "ok"; data: User } | GeneralApiProblem
export type GetUser = { kind: string; data: User; status: number } | GeneralApiProblem
