import "../Styling/Expenses.css";
import { useState } from "react";
import { UserInputType } from "../types/UserInput";
import { calculatedAmount } from "../utils/utils.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen, faCopy } from "@fortawesome/free-solid-svg-icons";
import { newDate } from "../utils/utils.tsx";

interface Props {
  activities: UserInputType[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
  onCopy: (id: number) => void;
}

const Expenses = ({ activities, onDelete, onEdit, onCopy }: Props) => {
  const [categoryState, setCategoryState] = useState("");
  const [currencyState, setCurrencyState] = useState("");
  const filterCategory = (activity: UserInputType) =>
    categoryState ? activity.category === categoryState : true;

  const currencyCategory = (activity: UserInputType) =>
    currencyState ? activity.currency === currencyState : true;

  return (
    <>
      <h1>My Expenses</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Activity description</th>
            <th>Category</th>
            <th>Amount of money</th>
            <th>Currency</th>
            <th>Date and time</th>
            <th>Change</th>
            <th>Copy</th>
            <th>Deletion</th>
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
                {<td>{newDate(activity.date!)}</td>}
                <td className="changeExpense">
                  <button
                    className="changeButton"
                    onClick={() => {
                      onEdit(activity.id!);
                      console.log(activity.id!);
                    }}
                  >
                    <FontAwesomeIcon icon={faPen} className={"changeIcon"} />
                  </button>
                </td>
                <td className="copyExpense">
                  <button
                    className="copyButton"
                    onClick={() => onCopy(activity.id!)}
                  >
                    <FontAwesomeIcon icon={faCopy} className={"copyIcon"} />
                  </button>
                </td>
                <td className="deleteExpense">
                  <button
                    className="deleteButton"
                    onClick={() => onDelete(activity.id!)}
                  >
                    <FontAwesomeIcon icon={faTrash} className={"trashIcon"} />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
        <tfoot>
          <tr>
            <td className="totalExpenses">Total Expenses</td>
            <td> </td>
            <td className="totalExpenses">
              {calculatedAmount(
                activities.filter(filterCategory).filter(currencyCategory)
              ).toFixed(2)}
            </td>
            <td className="totalExpenses">USD</td>
          </tr>
        </tfoot>
      </table>
    </>
  );
};

export default Expenses;
