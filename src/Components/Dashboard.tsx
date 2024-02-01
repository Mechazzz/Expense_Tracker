import Charts from "./Charts";
import "../Styling/Dashboard.css";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { UserInputType } from "../types/UserInput";
import { calculatedAmount, newDate } from "../utils/utils";
import { EUR, HUF } from "../utils/constants";
import Button from "./Button";

const Dashboard = () => {
  const [activities] = useLocalStorage<UserInputType[]>("activities", []);

  const [selectedYear, setSelectedYear] = useLocalStorage<number>(
    "selectedYear",
    2024
  );

  const yearFilteringFunction = (year: number) => {
    const activitiesForYear = activities.filter(
      (entry) => new Date(entry.date!).getFullYear() === year
    );
    if (activitiesForYear.length === 0) {
      return null;
    }
    return activitiesForYear;
  };

  const totalAmountPerYear = (year: number) => {
    const filteredYears = yearFilteringFunction(year);
    if (filteredYears === null) {
      const totalAmountNull = 0;
      return totalAmountNull;
    } else {
      let totalAmount = filteredYears.reduce((acc, entry) => {
        switch (entry.currency) {
          case "HUF":
            return acc + entry.amount / HUF;
          case "EUR":
            return acc + entry.amount * EUR;
          default:
            return acc + entry.amount;
        }
      }, 0);
      totalAmount = parseFloat(totalAmount.toFixed(2));
      return totalAmount;
    }
  };

  const mostExpensiveActivityOfTheYear = (year: number) => {
    const filteredActivities = yearFilteringFunction(year);
    if (filteredActivities === null) {
      return null;
    }
    const expensiveActivity = yearFilteringFunction(year)!.reduce(
      (maxEntry, currentEntry) =>
        currentEntry.amount > maxEntry.amount ? currentEntry : maxEntry
    );
    return expensiveActivity;
  };

  const mostExpensiveActivity = mostExpensiveActivityOfTheYear(selectedYear);

  const prevButtonFunction = () => {
    setSelectedYear((prevYear) => prevYear - 1);
  };

  const nextButtonFunction = () => {
    setSelectedYear((prevYear) => prevYear + 1);
  };

  return (
    <>
      <div className="main_container">
        <div className="yearSelector_outer">
          <div className="yearSelector_select">
            <Button className="yearButton" onClick={prevButtonFunction}>
              Previous year
            </Button>
            <label className="theYear">{selectedYear}</label>
            <Button className="yearButton" onClick={nextButtonFunction}>
              Next year
            </Button>
          </div>
          <div className="totalExpense">
            <p>
              Total expense amount in {selectedYear}: <br />
              {totalAmountPerYear(selectedYear)} USD
            </p>
          </div>
          <div className="mostExpensive">
            <label>
              {mostExpensiveActivity ? (
                <>
                  Most expensive activity of {selectedYear} : <br />
                  Activity: {mostExpensiveActivity.activity} <br />
                  Category: {mostExpensiveActivity.category} <br />
                  Amount: {mostExpensiveActivity.amount}{" "}
                  {mostExpensiveActivity.currency} <br />
                  Date: {newDate(mostExpensiveActivity.date!)} <br />
                </>
              ) : (
                "No available data for the selected year"
              )}
            </label>
          </div>
        </div>
        <div>
          <Charts />
        </div>
        <div></div>
      </div>
    </>
  );
};

export default Dashboard;