import { useEffect, useState } from "react";
/* Se crea un Hook y se generaliza con los tipos*/
export const useFetch = <T>(url: string) => {
  const [state, setState] = useState<{ 
    data: T | null;
    isLoading: boolean;
    hasError: Error | null;

}>({
    data: null,
    isLoading: true,
    hasError: null,
  });

  const getFetch = async () => {
    try {
        setState(prev => ({
            ...prev, 
            isLoading: true,
        }));


        const resp = await fetch(url);
        if (!resp.ok) throw new Error(resp.statusText);
        const data = await resp.json() as T;

        setState({
            data,
            isLoading: false,
            hasError: null
        });
    } catch (error) {
        setState({
            data: null,
            isLoading: false,
            hasError: error instanceof Error ? error : new Error(String(error)),

        }); 
    }
  };

  useEffect(() => {
    getFetch();
  }, [url]);

  return {
    data: state.data,
    isLoading: state.isLoading,
    hasError: state.hasError,
  };
};
