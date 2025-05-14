// Se crea el reducer para usar las diferentes acciones
import type { User } from "../interfaces";
import type { userAction } from "./userActions";



export const userReducer = (state: User[], action: userAction): User[] => {
    switch (action.type) {
        case 'ADD_USER':
            return [...state, action.payload]
        case 'DELETE_USER':
            return state.filter(user => user.id !== action.payload); 
        case 'REPLACE_ALL':
            return [...action.payload]

    
        default:
            return state;
    }
}