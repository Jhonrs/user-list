import type { User } from "../interfaces";

export type userAction = 
| {type: 'ADD_USER'; payload: User}
| {type: 'DELETE_USER'; payload: string}
| {type: 'REPLACE_ALL'; payload: User[]};