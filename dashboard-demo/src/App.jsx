import { 
  BrowserRouter as Router, Route, Routes, useNavigate
} from 'react-router-dom';

import TpOverview from "./components/TpOverview"
import TpDetailed from "./components/TpDetailed"

const TpOverviewData = [
  { name: "Information Page", rating: 3.5 },
  { name: "Home Page", rating: 3.3 },
  { name: "Login Page", rating: 3.6 },
  { name: "Store", rating: 4.2 },
  { name: "Booking Page", rating: 4.4 },
  { name: "Support Page", rating: 4.7 },
];

function App() {
  
  return (
    <Router>
      <Routes>
        <Route
          path=""
          element={
            <TpOverview
              width={750}
              height={450}
              data={TpOverviewData}
            />
          }
        />
        <Route path="/tpview/:name" element={<TpDetailed />} />
      </Routes>
    </Router>
  );
}

export default App;
