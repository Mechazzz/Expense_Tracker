import Charts from "./ChartsByYearlyExpenses.tsx";
import ChartsByMonthlyExpenses from "./ChartsByMonthlyExpenses .tsx";
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
  mostExpensiveCategoryByYear,
  cheapestCategoryByYear,
  expenseAmountDifferenceByPrevYearAndCurrentYear,
  expenseAmountDifferenceByCurrentYearAndNextYear,
} from "../utils/utils.ts";
import { useState } from "react";
import moment from "moment";

const Dashboard = () => {
  const [activities] = useLocalStorage<UserInputType[]>("activities", []);

  const [selectedDate, setSelectedDate] = useState(moment());

  const momentYear = selectedDate.year();
  const momentMonthAsWord = selectedDate.format("MMMM");
  const momentMonthAsNumber = selectedDate.month();

  const mostExpensiveActivity = mostExpensiveActivityOfTheYear(
    activities,
    momentYear
  );

  const highestExpenseCategory = mostExpensiveCategoryByYear(
    activities,
    momentYear
  );

  const cheapestExpenseCategory = cheapestCategoryByYear(
    activities,
    momentYear
  );

  const expenseDifferenceByPreviousAndCurrentYear =
    expenseAmountDifferenceByPrevYearAndCurrentYear(activities, momentYear);

  const expenseDifferenceByCurrentAndYextYear =
    expenseAmountDifferenceByCurrentYearAndNextYear(activities, momentYear);

  return (
    <div className="layout">
      <DashboardControls
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <Card>
        <div>
          <p>Total expense amount in {momentYear}: </p>
          <p> {totalAmountPerYear(activities, momentYear)} USD </p>
        </div>
      </Card>
      <Card>
        {highestExpenseCategory ? (
          <div>
            <p>Highest expense category in {momentYear}</p>
            <p>{highestExpenseCategory} USD</p>
          </div>
        ) : (
          "No available data for the selected year"
        )}
      </Card>
      <Card>
        {cheapestExpenseCategory ? (
          <div>
            <p>Cheapest expense category in {momentYear}</p>
            <p>{cheapestExpenseCategory} USD</p>
          </div>
        ) : (
          "No available data for the selected year"
        )}
      </Card>
      <Card>
        <div>
          {expenseDifferenceByPreviousAndCurrentYear ? (
            <div>{expenseDifferenceByPreviousAndCurrentYear}</div>
          ) : (
            "No available data for the selected year"
          )}
        </div>
        <br />
        <div>
          {expenseDifferenceByCurrentAndYextYear ? (
            <div>{expenseDifferenceByCurrentAndYextYear}</div>
          ) : (
            "No available data for the selected year"
          )}
        </div>
      </Card>
      <div className="charts_card">
        <Card>
          <Charts activities={filterActivitiesByYear(activities, momentYear)} />
        </Card>
      </div>
      <Card>
        <div>
          <p>All expenses by categories in {momentYear} :</p>
          <p>
            Free time:{" "}
            {totalExpensePerCategory(
              filterActivitiesByYear(activities, momentYear),
              "Free time"
            )}{" "}
            USD
          </p>
          <p>
            Business:{" "}
            {totalExpensePerCategory(
              filterActivitiesByYear(activities, momentYear),
              "Business"
            )}{" "}
            USD
          </p>
          <p>
            Household:{" "}
            {totalExpensePerCategory(
              filterActivitiesByYear(activities, momentYear),
              "Household"
            )}{" "}
            USD
          </p>
          <p>
            Others:{" "}
            {totalExpensePerCategory(
              filterActivitiesByYear(activities, momentYear),
              "Others"
            )}{" "}
            USD
          </p>
        </div>
      </Card>
      <div className="secondGraph">
        <Card>
          <ChartsByMonthlyExpenses
            activities={filterActivitiesByMonth(
              activities,
              momentYear,
              momentMonthAsNumber
            )}
          />
        </Card>
      </div>
      <Card>
        <div>
          <p>
            All expenses by categories in {momentMonthAsWord} in {momentYear}
          </p>
          <p>
            Free time:{" "}
            {totalExpensePerCategory(
              filterActivitiesByMonth(
                activities,
                momentYear,
                momentMonthAsNumber
              ),
              "Free time"
            )}{" "}
            USD
          </p>
          <p>
            {" "}
            Business:{" "}
            {totalExpensePerCategory(
              filterActivitiesByMonth(
                activities,
                momentYear,
                momentMonthAsNumber
              ),
              "Business"
            )}{" "}
            USD
          </p>
          <p>
            {" "}
            Household:{" "}
            {totalExpensePerCategory(
              filterActivitiesByMonth(
                activities,
                momentYear,
                momentMonthAsNumber
              ),
              "Household"
            )}{" "}
            USD
          </p>
          <p>
            {" "}
            Others:{" "}
            {totalExpensePerCategory(
              filterActivitiesByMonth(
                activities,
                momentYear,
                momentMonthAsNumber
              ),
              "Others"
            )}{" "}
            USD
          </p>
        </div>
      </Card>
      <Card>
        {mostExpensiveActivity ? (
          <div>
            <p>Most expensive activity in {momentYear} :</p>
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
