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
  const [shouldSync, setShouldSync] = useState(true);
  const { data: apiData, isLoading } = useFetch<User[]>(API_URL);

  // 1. Carga inicial desde API
  useEffect(() => {
    if (shouldSync && apiData) {
      // Filtrar y guardar datos válidos
      const validUsers = apiData.filter(user => user.status === true);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(validUsers));
      dispatch({ type: 'REPLACE_ALL', payload: validUsers });
      setShouldSync(false);
    }
  }, [apiData, shouldSync]);

  // 2. Cargar desde localStorage en recargas
  useEffect(() => {
    if (!shouldSync) return;
    
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
      const localUsers = JSON.parse(savedData) as User[];
      dispatch({ type: 'REPLACE_ALL', payload: localUsers });
      setShouldSync(false);
    }
  }, [shouldSync]);

  // 3. Persistir cambios locales
  useEffect(() => {
    if (!shouldSync) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    }
  }, [state]);

  // 4. Acciones
  const addUser = (user: User) => {
    dispatch({ type: 'ADD_USER', payload: { ...user, status: true } });
  };

  const deleteUser = (userId: string) => {
    dispatch({ type: 'DELETE_USER', payload: userId });
  };

  // 5. Sincronización manual
  const syncWithAPI = async () => {
    if (apiData) {
      const mergedUsers = [...state, ...apiData]
        .filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);
      dispatch({ type: 'REPLACE_ALL', payload: mergedUsers });
    }
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
