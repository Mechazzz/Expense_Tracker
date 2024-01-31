import Charts from "./Charts";
import "../Styling/Dashboard.css";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { UserInputType } from "../types/UserInput";
import { newDate } from "../utils/utils";

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
      return null;
    } else {
      const totalAmount = filteredYears.reduce(
        (acc, entry) => acc + entry.amount,
        0
      );
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

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const year = parseInt(event.target.value, 10);
    setSelectedYear(year);
  };

  const startYear = 1950;
  const endYear = 2100;

  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, index) => startYear + index
  );

  return (
    <>
      <div className="main_container">
        <div>
          <label>Select year:</label>
          <select value={selectedYear} onChange={handleYearChange}>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <p>
            Total expense amount in {selectedYear}:
            {totalAmountPerYear(selectedYear)}
          </p>
        </div>
        <div>
          <label>
            {mostExpensiveActivity ? (
              <>
                Most expensive activity of {selectedYear} : <br />
                Activity: {mostExpensiveActivity.activity} <br />
                Category: {mostExpensiveActivity.category} <br />
                Amount: {mostExpensiveActivity.amount} <br />
                Currency: {mostExpensiveActivity.currency} <br />
                Date: {newDate(mostExpensiveActivity.date!)} <br />
              </>
            ) : (
              "No available data for the selected year"
            )}
          </label>
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
