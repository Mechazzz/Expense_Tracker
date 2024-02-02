import Charts from "./Charts";
import "../Styling/Dashboard.css";
import DashboardControls from "./DashboardControls";
import Card from "./Card";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { UserInputType } from "../types/UserInput";
import { filterActivitiesByYear } from "../utils/utils.tsx";

const Dashboard = () => {
  const [activities] = useLocalStorage<UserInputType[]>("activities", []);

  const [selectedYear, setSelectedYear] = useLocalStorage<number>(
    "selectedYear",
    2024
  );

  return (
    <div className="layout">
      <DashboardControls
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        activities={activities}
      />
      <Card>First</Card>
      <Card>First</Card>
      <Card>First</Card>
      <Card>First</Card>
      <div className="charts_card">
        <Card>
          <Charts
            activities={filterActivitiesByYear(activities, selectedYear)}
          />
        </Card>
      </div>
      <Card>First</Card>
      <Card>First</Card>
      <Card>First</Card>
      <Card>First</Card>
    </div>
  );
};

export default Dashboard;
