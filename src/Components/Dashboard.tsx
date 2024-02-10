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
  expenseAmountDifferenceByPrevYearAndCurrentYearText,
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
    expenseAmountDifferenceByPrevYearAndCurrentYearText(activities, momentYear);

  return (
    <div className="layout">
      <DashboardControls
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <Card>
        <div className="firstRow">
          <span className="amountText">Total expense: </span>
          <br />
          <span className="amount">
            {" "}
            {totalAmountPerYear(activities, momentYear)} USD{" "}
          </span>
        </div>
      </Card>
      <Card>
        {highestExpenseCategory ? (
          <div className="firstRow">
            <span className="amountText">Highest expense category:</span>
            <br />
            <span className="amount">{highestExpenseCategory} USD</span>
          </div>
        ) : (
          "No available data for the selected year"
        )}
      </Card>
      <Card>
        {cheapestExpenseCategory ? (
          <div className="firstRow">
            <span className="amountText">Cheapest expense category:</span>
            <br />
            <span className="amount">{cheapestExpenseCategory} USD</span>
          </div>
        ) : (
          "No available data for the selected year"
        )}
      </Card>
      <Card>
        {expenseDifferenceByPreviousAndCurrentYear ? (
          <div className="firstRow">
            <span>Expense amount compared the current and last year:</span>
            <span className="amount">
              {expenseDifferenceByPreviousAndCurrentYear} USD
            </span>
          </div>
        ) : (
          "No available data for the selected year"
        )}
      </Card>
      <div className="charts_card">
        <Card>
          <Charts activities={filterActivitiesByYear(activities, momentYear)} />
        </Card>
      </div>
      <Card>
        <div>
          <span>All expenses by categories:</span>
          <br />
          Free time:{" "}
          <span className="amount">
            {totalExpensePerCategory(
              filterActivitiesByYear(activities, momentYear),
              "Free time"
            )}{" "}
            USD
          </span>
          <br />
          Business:{" "}
          <span className="amount">
            {totalExpensePerCategory(
              filterActivitiesByYear(activities, momentYear),
              "Business"
            )}{" "}
            USD
          </span>
          <br />
          Household:{" "}
          <span className="amount">
            {totalExpensePerCategory(
              filterActivitiesByYear(activities, momentYear),
              "Household"
            )}{" "}
            USD
          </span>
          <br />
          Others:{" "}
          <span className="amount">
            {totalExpensePerCategory(
              filterActivitiesByYear(activities, momentYear),
              "Others"
            )}{" "}
            USD
          </span>
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
          <span>All expenses by categories in {momentMonthAsWord}:</span>
          <br />
          Free time:{" "}
          <span className="amount">
            {totalExpensePerCategory(
              filterActivitiesByMonth(
                activities,
                momentYear,
                momentMonthAsNumber
              ),
              "Free time"
            )}{" "}
            USD
          </span>
          <br /> Business:{" "}
          <span className="amount">
            {totalExpensePerCategory(
              filterActivitiesByMonth(
                activities,
                momentYear,
                momentMonthAsNumber
              ),
              "Business"
            )}{" "}
            USD
          </span>
          <br /> Household:{" "}
          <span className="amount">
            {totalExpensePerCategory(
              filterActivitiesByMonth(
                activities,
                momentYear,
                momentMonthAsNumber
              ),
              "Household"
            )}{" "}
            USD
          </span>
          <br /> Others:{" "}
          <span className="amount">
            {totalExpensePerCategory(
              filterActivitiesByMonth(
                activities,
                momentYear,
                momentMonthAsNumber
              ),
              "Others"
            )}{" "}
            USD
          </span>
        </div>
      </Card>
      <Card>
        {mostExpensiveActivity ? (
          <div>
            <span>Most expensive yearly activity:</span>
            <br /> Activity:{" "}
            <span className="amount">
              {mostExpensiveActivity.activity}
            </span>{" "}
            <br />
            Category:{" "}
            <span className="amount">{mostExpensiveActivity.category} </span>
            <br />
            Amount:{" "}
            <span className="amount">
              {currencyChanger(mostExpensiveActivity).toFixed(2)} USD
            </span>
            <br />
            Date:{" "}
            <span className="amount">
              {newDate(mostExpensiveActivity.date!)}{" "}
            </span>
          </div>
        ) : (
          "No available data for the selected year"
        )}
      </Card>
    </div>
  );
};

export default Dashboard;
