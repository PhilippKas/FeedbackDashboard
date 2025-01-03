import { useState, useEffect } from 'react';

export function useTPData(startDate, endDate) {
  const [tpData, setTpData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/analytics/tp_overview?start_date=${startDate}&end_date=${endDate}`
        );
        const data = await response.json();
        setTpData(data);
        setError(null);
      } catch (error) {
        console.error('Error:', error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [startDate, endDate]);

  return { tpData, isLoading, error };
}