import "../Styling/Expenses.css";
import { useState } from "react";
import { UserInputType } from "../types/UserInput";

interface Props {
  activities: UserInputType[];
  onDelete: (id: number) => void;
}

const Expenses = ({ activities, onDelete }: Props) => {
  const [categoryState, setCategoryState] = useState("");
  const [currencyState, setCurrencyState] = useState("");
  const EUR = 380;
  const USD = 340;
  const filterCategory = (activity: UserInputType) =>
    categoryState ? activity.category === categoryState : true;

  const currencyCategory = (activity: UserInputType) =>
    currencyState ? activity.currency === currencyState : true;

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Activity description</th>
          <th>Category</th>
          <th>Amount of Money</th>
          <th>Currency</th>
        </tr>
        <tr>
          <td></td>
          <td>
            <select
              value={categoryState}
              onChange={(e) => setCategoryState(e.target.value)}
            >
              <option value="">All categories</option>
              <option value="Free time">Free time</option>
              <option value="Business">Business</option>
              <option value="Household">Household</option>
              <option value="Others">Others</option>
            </select>
          </td>
          <td></td>
          <td>
            <select
              value={currencyState}
              onChange={(e) => setCurrencyState(e.target.value)}
            >
              <option value="">All currencies</option>
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
              <option value="HUF">HUF</option>
            </select>
          </td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        {activities
          .filter(filterCategory)
          .filter(currencyCategory)
          .map((activity) => (
            <tr key={activity.id}>
              <td>{activity.activity}</td>
              <td>{activity.category}</td>
              <td>{activity.amount}</td>
              <td>{activity.currency}</td>
              <td>
                <button onClick={() => onDelete(activity.id!)}>Delete</button>
              </td>
            </tr>
          ))}
      </tbody>
      <tfoot>
        <tr>
          <td className="totalExpenses">Total Expenses</td>
          <td>
            {activities
              .filter(filterCategory)
              .filter(currencyCategory)
              .reduce((acc, activity) => {
                switch (activity.currency) {
                  case "USD":
                    return activity.amount * USD + acc;
                  case "EUR":
                    return activity.amount * EUR + acc;
                  default:
                    return activity.amount + acc;
                }
              }, 0)
              .toFixed(2)}
          </td>
          <td></td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  );
};

export default Expenses;
