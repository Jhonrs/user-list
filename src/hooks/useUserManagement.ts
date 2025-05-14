// useUserManagement.ts
import { useEffect, useReducer, useState } from "react";
import { userReducer } from "../useReducer";
import { useFetch } from "./useFetch";
import type { User } from "../interfaces";


const API_URL = "https://api.fake-rest.refine.dev/users";
const LOCAL_STORAGE_KEY = "valid-users";

// Función para filtrar usuarios válidos
const filterValidUsers = (users: User[]) =>
  users.filter((user) => user.status === true);

export const useUserManagement = () => {
  const [state, dispatch] = useReducer(userReducer, []);
  const [shouldSync, setShouldSync] = useState(false);
  const { data: apiData, isLoading } = useFetch<User[]>(API_URL);

  // Cargar datos iniciales desde localStorage
  useEffect(() => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
      dispatch({ type: "REPLACE_ALL", payload: JSON.parse(savedData) });
    }
  }, []);

// Sincronización manual con API
useEffect(() => {
    if (apiData && shouldSync) {
      const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      const localUsers = savedData ? JSON.parse(savedData) : [];
      
      // Combinar manteniendo eliminaciones locales
      const mergedUsers = apiData.filter(apiUser => 
        !localUsers.some((localUser: User) => localUser.id === apiUser.id)
      );
      
      const newUsers = [...localUsers, ...mergedUsers];
      dispatch({ type: 'REPLACE_ALL', payload: newUsers });
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newUsers));
      setShouldSync(false);
    }
  }, [apiData, shouldSync]);

  // 2. Persistir solo usuarios válidos
  useEffect(() => {
    const validUsers = state.filter((user) => user.status === true);
    if (validUsers.length !== state.length || validUsers.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(validUsers));
    }
  }, [state]);

  // 3. Acciones
  const addUser = (user: User) => {
    dispatch({ type: "ADD_USER", payload: { ...user, status: true } });
  };

  const deleteUser = (userId: string) => {
    dispatch({ type: "DELETE_USER", payload: userId });
  };

  const syncWithAPI = () => {
    setShouldSync(true);
  };


  return {
    users: filterValidUsers(state),
    isLoading: isLoading as boolean,
    addUser,
    deleteUser,
    syncWithAPI,
    hasError: false, // Añadir manejo de errores según necesidad
  };
};
