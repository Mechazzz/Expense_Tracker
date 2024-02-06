import Button from "./Button";
import { monthsList, getMonthName } from "../utils/utils";

interface Props {
  selectedYear: number;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
  selectedMonth: number;
  setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
}

const DashboardControls = ({
  selectedYear,
  setSelectedYear,
  selectedMonth,
  setSelectedMonth,
}: Props) => {
  const prevButtonFunctionForYears = () => {
    setSelectedYear((prevYear) => prevYear - 1);
  };

  const nextButtonFunctionForYears = () => {
    setSelectedYear((prevYear) => prevYear + 1);
  };

  const prevButtonFunctionForMonths = () => {
    setSelectedMonth((prevMonth) => {
      if (prevMonth > 0) {
        return prevMonth - 1;
      } else {
        return prevMonth;
      }
    });
  };

  const nexButtonFunctionForMonths = () => {
    setSelectedMonth((prevMonth) => {
      if (prevMonth < 11) {
        return prevMonth + 1;
      } else {
        return prevMonth;
      }
    });
  };

  return (
    <>
      <div className="dashboardControls">
        <div className="yearSelector_select">
          <Button className="yearButton" onClick={prevButtonFunctionForYears}>
            Previous year
          </Button>
          <label className="theYear">{selectedYear}</label>
          <Button className="yearButton" onClick={nextButtonFunctionForYears}>
            Next year
          </Button>
        </div>
        <div>
          <Button className="theMonth" onClick={prevButtonFunctionForMonths}>
            Previous month
          </Button>
          <label>{getMonthName(monthsList, selectedMonth)}</label>
          <Button className="theMonth" onClick={nexButtonFunctionForMonths}>
            Next month
          </Button>
        </div>
        <div className="totalExpense"></div>
        <div className="mostExpensive"></div>
      </div>
    </>
  );
};

export default DashboardControls;
