import Button from "./Button";
import {
  currencyChanger,
  newDate,
  filterActivitiesByYear,
} from "../utils/utils";
import { EUR, HUF } from "../utils/constants";
import { UserInputType } from "../types/UserInput";

interface Props {
  selectedYear: number;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
  activities: UserInputType[];
}

const DashboardControls = ({
  selectedYear,
  setSelectedYear,
  activities,
}: Props) => {
  const totalAmountPerYear = (year: number) => {
    const filteredYears = filterActivitiesByYear(activities, year);
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
  };

  const mostExpensiveActivityOfTheYear = (year: number) => {
    const filteredActivities = filterActivitiesByYear(activities, year);
    if (filteredActivities.length === 0) {
      return null;
    }
    const expensiveActivity = filterActivitiesByYear(activities, year)!.reduce(
      (maxEntry, currentEntry) =>
        currencyChanger(currentEntry) > currencyChanger(maxEntry)
          ? currentEntry
          : maxEntry
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
      <div className="dashboardControls">
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
                Amount: {currencyChanger(mostExpensiveActivity).toFixed(2)}
                USD <br />
                Date: {newDate(mostExpensiveActivity.date!)} <br />
              </>
            ) : (
              "No available data for the selected year"
            )}
          </label>
        </div>
      </div>
    </>
  );
};

export default DashboardControls;
