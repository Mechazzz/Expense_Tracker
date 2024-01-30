import Charts from "./Charts";
import "../Styling/Dashboard.css";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { UserInputType } from "../types/UserInput";
import { useState } from "react";

const Dashboard = () => {
  const [activities] = useLocalStorage<UserInputType[]>("activities", []);

  const [selectedYear, setSelectedYear] = useLocalStorage<number>(
    "selectedYear",
    2024
  );

  const totalAmountPerYear = (year: number) => {
    return activities
      .filter((entry) => new Date(entry.date!).getFullYear() === year)
      .reduce((acc, entry) => acc + entry.amount, 0);
  };

  const handleYearChange = (event) => {
    const year = parseInt(event.target.value, 10);
    setSelectedYear(year);
  };

  return (
    <>
      <div>
        <label>Select year:</label>
        <select value={selectedYear} onChange={handleYearChange}>
          <option value={2020}>2020</option>
          <option value={2021}>2021</option>
          <option value={2022}>2022</option>
          <option value={2023}>2023</option>
          <option value={2024}>2024</option>
          <option value={2025}>2025</option>
        </select>
        <p>
          Sum for {selectedYear}: {totalAmountPerYear(selectedYear)}
        </p>
      </div>
      <div>
        <Charts />
      </div>
    </>
  );
};

export default Dashboard;
