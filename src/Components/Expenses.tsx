import "../Styling/Expenses.css";
import { useState } from "react";
import { UserInputType } from "../types/UserInput";
import { expenseAmountInUSD, newDate } from "../utils/utils.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen, faCopy } from "@fortawesome/free-solid-svg-icons";
import IconButton from "./IconButton.tsx";
import Button from "./Button.tsx";
import { safeFetch } from "./safeFetch.ts";
import { expense } from "../../common/types/expense.ts";

const deleteData = async (/* id: string */) => {
  console.log("sajt");
  const encodedID = /* encodeURIComponent(id); */ "1";
  console.log(encodedID);
  console.log("sajt2");
  const response = await safeFetch(
    "DELETE",
    `http://localhost:5000/api/expenseData/${encodedID}`,
    expense
  );
  console.log("sajt3");
  return response;
};

interface Props {
  activities: UserInputType[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onCopy: (id: string) => void;
  toggleFunction: () => void;
}

const Expenses = ({
  activities,
  /*   onDelete, */
  onEdit,
  onCopy,
  toggleFunction,
}: Props) => {
  const [categoryState, setCategoryState] = useState("");
  const [currencyState, setCurrencyState] = useState("");
  const filterCategory = (activity: UserInputType) =>
    categoryState ? activity.category === categoryState : true;

  const currencyCategory = (activity: UserInputType) =>
    currencyState ? activity.currency === currencyState : true;

  return (
    <>
      <div className="expenses_container">
        <h1>My Expenses</h1>
        <div className="newActivityButton">
          <Button onClick={() => toggleFunction()}>Adding new Activity</Button>
        </div>
        <div className="table_container">
          <table className="table">
            <thead>
              <tr>
                <th>Activity description</th>
                <th>Category</th>
                <th>Amount of money</th>
                <th>Currency</th>
                <th>Date and time</th>
                <th>Actions</th>
              </tr>
              <tr>
                <td className="emptyThTd"></td>
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
                <td className="emptyThTd"></td>
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
                <td className="emptyThTd"></td>
                <td className="emptyThTd"></td>
              </tr>
            </thead>
            <tbody>
              {activities
                .filter(filterCategory)
                .filter(currencyCategory)
                .map((activity) => (
                  <tr key={activity.id}>
                    <td className="activityDataTd">{activity.activity}</td>
                    <td className="categoryDataTd">{activity.category}</td>
                    <td className="amountDataTd">{activity.amount}</td>
                    <td className="currencyDataTd">{activity.currency}</td>
                    {<td className="dateDataTd">{newDate(activity.date!)}</td>}
                    <td className="ExpenseDivTd">
                      <IconButton
                        variant="change"
                        onClick={() => {
                          onEdit(activity.id!);
                          console.log(activity.id!);
                        }}
                      >
                        <FontAwesomeIcon icon={faPen} />
                      </IconButton>
                      <IconButton
                        variant="copy"
                        onClick={() => onCopy(activity.id!)}
                      >
                        <FontAwesomeIcon icon={faCopy} />
                      </IconButton>
                      <IconButton
                        variant="delete"
                        onClick={() => deleteData(activity.id!)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </IconButton>
                    </td>
                  </tr>
                ))}
            </tbody>
            <tfoot>
              <tr>
                <td className="totalExpensesTfootTD">Total Expenses</td>
                <td className="emptyTfootTd"> </td>
                <td className="totalExpensesTfootAmount">
                  {expenseAmountInUSD(
                    activities.filter(filterCategory).filter(currencyCategory)
                  ).toFixed(2)}
                </td>
                <td className="totalExpensesTfootCurrency">USD</td>
                <td className="emptyTfootTd"></td>
                <td className="emptyTfootTd"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
  );
};

export default Expenses;
