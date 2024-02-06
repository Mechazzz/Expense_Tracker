import Charts from "./Charts";
import Charts2 from "./Charts2.tsx";
import "../Styling/Dashboard.css";
import DashboardControls from "./DashboardControls";
import Card from "./Card";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { UserInputType } from "../types/UserInput";
import {
  filterActivitiesByYear,
  filterActivitiesByMonth,
  totalAmountPerYear,
  mostExpensiveActivityOfTheYear,
  currencyChanger,
  newDate,
  totalExpensePerCategory,
  monthsList,
  getMonthName,
} from "../utils/utils.ts";
import { useState } from "react";

const Dashboard = () => {
  const [activities] = useLocalStorage<UserInputType[]>("activities", []);

  const [selectedYear, setSelectedYear] = useLocalStorage<number>(
    "selectedYear",
    2024
  );

  const [selectedMonth, setSelectedMonth] = useState<number>(0);

  const mostExpensiveActivity = mostExpensiveActivityOfTheYear(
    activities,
    selectedYear
  );

  return (
    <div className="layout">
      <DashboardControls
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
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
          <p>
            Free time:{" "}
            {totalExpensePerCategory(
              filterActivitiesByYear(activities, selectedYear),
              "Free time"
            )}{" "}
            USD
          </p>
          <p>
            Business:{" "}
            {totalExpensePerCategory(
              filterActivitiesByYear(activities, selectedYear),
              "Business"
            )}{" "}
            USD
          </p>
          <p>
            Household:{" "}
            {totalExpensePerCategory(
              filterActivitiesByYear(activities, selectedYear),
              "Household"
            )}{" "}
            USD
          </p>
          <p>
            Others:{" "}
            {totalExpensePerCategory(
              filterActivitiesByYear(activities, selectedYear),
              "Others"
            )}{" "}
            USD
          </p>
        </div>
      </Card>
      <div className="secondGraph">
        <Card>
          <Charts2
            activities={filterActivitiesByMonth(
              activities,
              selectedYear,
              selectedMonth
            )}
          />
        </Card>
      </div>
      <Card>
        <div>
          <p>
            All expenses by categories in{" "}
            {getMonthName(monthsList, selectedMonth)} in {selectedYear}
          </p>
          <p>
            Free time:{" "}
            {totalExpensePerCategory(
              filterActivitiesByMonth(activities, selectedYear, selectedMonth),
              "Free time"
            )}{" "}
            USD
          </p>
          <p>
            {" "}
            Business:{" "}
            {totalExpensePerCategory(
              filterActivitiesByMonth(activities, selectedYear, selectedMonth),
              "Business"
            )}{" "}
            USD
          </p>
          <p>
            {" "}
            Household:{" "}
            {totalExpensePerCategory(
              filterActivitiesByMonth(activities, selectedYear, selectedMonth),
              "Household"
            )}{" "}
            USD
          </p>
          <p>
            {" "}
            Others:{" "}
            {totalExpensePerCategory(
              filterActivitiesByMonth(activities, selectedYear, selectedMonth),
              "Others"
            )}{" "}
            USD
          </p>
        </div>
      </Card>
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
