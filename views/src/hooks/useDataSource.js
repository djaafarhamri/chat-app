import axios from "axios";
import { useState, useEffect } from "react";

export const useDataSource = (dataSource, render) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(dataSource);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchData();
  }, [dataSource, render]);
  console.log(data)
  return { data, loading, error };
}