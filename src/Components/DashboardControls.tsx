import Button from "./Button";

interface Props {
  selectedYear: number;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
}

const DashboardControls = ({ selectedYear, setSelectedYear }: Props) => {
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
        <div className="totalExpense"></div>
        <div className="mostExpensive"></div>
      </div>
    </>
  );
};

export default DashboardControls;
