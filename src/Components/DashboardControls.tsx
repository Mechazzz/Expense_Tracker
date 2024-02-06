import IconButton from "./IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faForward,
  faBackward,
  faCaretLeft,
  faCaretRight,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { monthsList, getMonthName } from "../utils/utils";

interface Props {
  selectedDate: moment.Moment;
  setSelectedDate: React.Dispatch<React.SetStateAction<moment.Moment>>;
}

const DashboardControls = ({ selectedDate, setSelectedDate }: Props) => {
  const prevButtonFunctionForYearsSubtract = () => {
    setSelectedDate((oldDate) => oldDate.subtract(1, "y"));
  };

  const prevButtonFunctionForMonthsSubtract = () => {
    setSelectedDate((oldDate) => oldDate.subtract(1, "m"));
  };

  const nextButtonFunctionForYearsAdd = () => {
    setSelectedDate((oldDate) => oldDate.add(1, "y"));
  };

  const nextButtonFunctionForMonthsAdd = () => {
    setSelectedDate((oldDate) => oldDate.add(1, "m"));
  };

  const momentYear = selectedDate.year();
  const momentMonth = getMonthName(monthsList, selectedDate.month());

  return (
    <>
      <div className="dashboardControls">
        <div className="yearSelector_select">
          <IconButton onClick={prevButtonFunctionForYearsSubtract} variant="">
            <FontAwesomeIcon icon={faBackward} />
          </IconButton>
          <IconButton onClick={prevButtonFunctionForMonthsSubtract} variant="">
            <FontAwesomeIcon icon={faCaretLeft} />
          </IconButton>
          <label className="theYear">
            {momentMonth} {momentYear}
          </label>
          <IconButton onClick={nextButtonFunctionForMonthsAdd} variant="">
            <FontAwesomeIcon icon={faCaretRight} />
          </IconButton>
          <IconButton onClick={nextButtonFunctionForYearsAdd} variant="">
            <FontAwesomeIcon icon={faForward} />
          </IconButton>
        </div>
        <div className="totalExpense"></div>
        <div className="mostExpensive"></div>
      </div>
    </>
  );
};

export default DashboardControls;
