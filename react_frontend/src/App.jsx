import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router, Route, Routes
} from 'react-router-dom';
import TpOverview from "./components/TpOverview"
import TpDetailed from "./components/TpDetailed"

function App() {

  const [tpData, setTpData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(
          'http://localhost:8000/api/v1/analytics/tp_overview?start_date=2024-01-01&end_date=2024-04-01'
        );
        const data = await response.json();
        console.log(data)

        setTpData(data);

      } catch (error) {
        console.error('Error:', error);
      
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
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