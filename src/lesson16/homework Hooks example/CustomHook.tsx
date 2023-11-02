import { useEffect, useState } from "react";
type TStatus = {
  loading: boolean;
  data: any;
  error: any;
};

type TUseFetchProps = {
  url: string;
  options?: any;
};

export function useFetch(props: TUseFetchProps) {
  const [status, setStatus] = useState<TStatus>({
    loading: false,
    data: undefined,
    error: undefined,
  });
  const { url, options } = props;

  async function fetchData(url: string, options: any) {
    try {
      setStatus((prev) => ({ ...prev, loading: true }));
      const result = await fetch(url, options);
      const data = await result.json();
      console.log(data);
      setStatus((prev) => ({ ...prev, loading: false, data: data }));
    } catch (err) {
      setStatus((prev) => ({ ...prev, loading: false, error: err }));
    }
  }

  useEffect(() => {
    if (url) {
      fetchData(url, options);
    }
  }, [options, url]);
  return status;
}
