import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../Styling/Datepicker.css";

interface Props {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

const Datepicker = ({ selectedDate, onDateChange }: Props) => {
  return (
    <div>
      <DatePicker
        showIcon
        selected={selectedDate}
        onChange={(date: Date) => onDateChange(date)}
        className="datePickerClass"
      />
    </div>
  );
};

export default Datepicker;
