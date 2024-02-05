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
  totalExpensePerCategory,
} from "../utils/utils.ts";

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

  const totalExpenseOfFreeTimePerYear = totalExpensePerCategory(
    filterActivitiesByYear(activities, selectedYear),
    "Free time"
  );

  const totalExpenseOfBusinessPerYear = totalExpensePerCategory(
    filterActivitiesByYear(activities, selectedYear),
    "Business"
  );

  const totalExpenseOfHouseholdPerYear = totalExpensePerCategory(
    filterActivitiesByYear(activities, selectedYear),
    "Household"
  );

  const totalExpenseOfOthersPerYear = totalExpensePerCategory(
    filterActivitiesByYear(activities, selectedYear),
    "Others"
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
        <div>
          <p>All expenses by categories in {selectedYear} :</p>
          <p>Free time: {totalExpenseOfFreeTimePerYear} USD</p>
          <p>Business: {totalExpenseOfBusinessPerYear} USD</p>
          <p>Household: {totalExpenseOfHouseholdPerYear} USD</p>
          <p>Others: {totalExpenseOfOthersPerYear} USD</p>
        </div>
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
