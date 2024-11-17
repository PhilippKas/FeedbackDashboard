// /App.jsx
import PieChart from "./components/PieChart";

const pieChartData = [
  { name: "Christians", value: 2_173_180_000 },
  { name: "Muslims", value: 1_598_510_000 },
  { name: "None", value: 1_126_500_000 },
  { name: "Hindus", value: 1_033_080_000 },
  { name: "Buddhists", value: 487_540_000 },
  { name: "Folk Religionists", value: 405_120_000 },
  { name: "Other Religions", value: 58_110_000 },
  { name: "Jews", value: 13_850_000 },
];

function App() {
  return <PieChart width={750} height={450} data={pieChartData} />;
}

export default App;