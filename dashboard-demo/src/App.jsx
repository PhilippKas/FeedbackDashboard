import { 
  BrowserRouter as Router, Route, Routes, useNavigate
} from 'react-router-dom';

import { useState, useEffect } from 'react'

import TpOverview from "./components/TpOverview"
import TpDetailed from "./components/TpDetailed"

function App() {
  const [tpData, setTpData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const url = 'http://127.0.0.1:8000/tp_overview';
        const queryParams = new URLSearchParams({
          start_date: '2024-04-01',
          end_date: '2024-06-01',
        }).toString();

        const response = await fetch(`${url}?${queryParams}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setTpData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, []);

  // Handle loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Router>
      <Routes>
        <Route
          path=""
          element={
            <TpOverview
              width={750}
              height={450}
              data={tpData}
            />
          }
        />
        <Route path="/tpview/:name" element={<TpDetailed />} />
      </Routes>
    </Router>
  );
}

export default App;
