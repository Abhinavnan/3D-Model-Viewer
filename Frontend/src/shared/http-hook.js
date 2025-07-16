import React,{useState, useCallback, useEffect, useRef} from 'react'
import axios from 'axios';

export const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    const activeHttpRequests = useRef([]);
    
    const sendRequest = useCallback(async (method,url, data) => {
        setIsLoading(true);
        setError(null);
        const abortCtrl = new AbortController();
        activeHttpRequests.current.push(abortCtrl);
        const signal = abortCtrl.signal;
        try {
            let response 
            if(method === 'delete') 
                response = await axios.delete(url, {signal});
            else 
                response = await axios({url, method, data, signal});
            activeHttpRequests.current = activeHttpRequests.current.filter(reqCtrl => reqCtrl !== abortCtrl);
            const message = response.data.message;
            if(message) setMessage(message);
            return response.data;
        } catch (error) {
            setError(error.response.data.message);
            throw error;
        }finally {
            setIsLoading(false);
        }
        
    }, []);

  useEffect(() => {return () => {activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort())}}, []);
  const clearError = () => setError(null);
  const clearMessage = () => setMessage('');

  return {error, isLoading, sendRequest, clearError, message, clearMessage};
}

