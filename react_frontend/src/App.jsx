import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router, Route, Routes
} from 'react-router-dom';
import TpOverview from "./components/TpOverview"
import TpDetailed from "./components/TpDetailed"
import DateSelector from './components/DateSelector';

function App() {

  const [tpData, setTpData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [startDate, setStartDate] = useState('2024-01-01');
  const [endDate, setEndDate] = useState('2024-04-01');

  const fetchData = async (start, end ) => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/analytics/tp_overview?start_date=${start}&end_date=${end}`
      );
      const data = await response.json();
      console.log(data)

      setTpData(data);

    } catch (error) {
      console.error('Error:', error);
    
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
      fetchData(startDate, endDate);
    }, [startDate, endDate]
  );

  const handleDateChange = (newStartDate, newEndDate) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="container mx-auto p-4">
        <DateSelector
          onDateChange={handleDateChange}
          initialStartDate={startDate}
          initialEndDate={endDate}
      />
        <Routes>
          <Route
            path="/"
            element={<TpOverview data={tpData}/>}
          />
          <Route
            path="/tpview/:name"
            element={<TpDetailed/>}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;