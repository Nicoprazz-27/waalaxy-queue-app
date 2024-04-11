import { useState, useEffect } from 'react';
import { getRequest } from '../services/request';

const useAxios = <T>(path: string) => {
  const [data, setData] = useState<T[]|null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getRequest(path)
      .then((response)=>{
        setData(response.data);
      })
      .catch((err)=>setError(err))
      .finally(()=> setIsLoading(false))
  }, [path]);

  return { data, isLoading, error };
}

export default useAxios;