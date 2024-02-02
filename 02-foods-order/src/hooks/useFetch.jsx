import { useEffect } from "react";
import { useState } from "react";

async function sendHttpRequest(url, config) {
  const res = await fetch(url, config);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Something went wrong, failed to send request.');
  }
  return data;
}

export function useFetch(url, config, ininitalData) {
  const [error, setError] = useState({ hasError: false, message: '' });
  const [data, setData] = useState(ininitalData);
  const [isFetching, setIsFetching] = useState(false);

  function clearData() {
    setData(ininitalData);
  }

  const sendRequest = useCallBack(
    async function sendRequest(data) {
      setIsFetching(true);
      try {
        const resData = await sendHttpRequest(url, {config, body: data})
        setData(resData);
      } catch (error) {
        setError({
          hasError: true,
          message: error.message || 'Something went wrong!'
        });
      } finally {
        setIsFetching(false);
      }
    }, [url, config])

  useEffect(() => {
    if ((config && (config.method === 'GET' || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config])

  return { isFetching, error, data, sendRequest, clearData }
}