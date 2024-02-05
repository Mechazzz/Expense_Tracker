import Charts from "./Charts";
import "../Styling/Dashboard.css";
import DashboardControls from "./DashboardControls";
import Card from "./Card";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { UserInputType } from "../types/UserInput";
import {
  filterActivitiesByYear,
  totalAmountPerYear,
  mostExpensiveActivityOfTheYear,
  currencyChanger,
  newDate,
} from "../utils/utils.tsx";

const Dashboard = () => {
  const [activities] = useLocalStorage<UserInputType[]>("activities", []);

  const [selectedYear, setSelectedYear] = useLocalStorage<number>(
    "selectedYear",
    2024
  );

  const mostExpensiveActivity = mostExpensiveActivityOfTheYear(
    activities,
    selectedYear
  );

  return (
    <div className="layout">
      <DashboardControls
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
      />
      <Card>
        Total expense amount in {selectedYear}: <br />
        {totalAmountPerYear(activities, selectedYear)} USD
      </Card>
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
      <Card>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
      </Card>
      <div className="secondGraph">
        <Card>First</Card>
      </div>
      <Card>First</Card>
      <Card>
        {mostExpensiveActivity ? (
          <div>
            <p>Most expensive activity of {selectedYear} :</p>
            <p> Activity: {mostExpensiveActivity.activity} </p>
            <p>Category: {mostExpensiveActivity.category} </p>
            <p>
              Amount: {currencyChanger(mostExpensiveActivity).toFixed(2)} USD
            </p>
            <p> Date: {newDate(mostExpensiveActivity.date!)} </p>
          </div>
        ) : (
          "No available data for the selected year"
        )}
      </Card>
    </div>
  );
};

export default Dashboard;
