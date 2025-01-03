import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router, Route, Routes
} from 'react-router-dom';
import TpOverview from "./components/TpOverview"
import TpDetailed from "./components/TpDetailed"
import DateSelector from './components/DateSelector';
import { useTPData } from './hooks/useTpData';

function App() {

  const [startDate, setStartDate] = useState('2024-01-01');
  const [endDate, setEndDate] = useState('2024-04-01');
  const { tpData, isLoading, error } = useTPData(startDate, endDate);

  const handleDateChange = (newStartDate, newEndDate) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

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