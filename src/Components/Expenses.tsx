import "../Styling/Expenses.css";
import { useState } from "react";
import { UserInputType } from "../types/UserInputType.tsx";
import { expenseAmountInUSD, newDate } from "../utils/utils.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen, faCopy } from "@fortawesome/free-solid-svg-icons";
import IconButton from "./IconButton.tsx";
import Button from "./Button.tsx";
import { deleteData } from "../api/expenses.ts";

interface Props {
  activities: UserInputType[];
  onEdit: (id: string) => void;
  onCopy: (id: string) => void;
  toggleFunction: () => void;
  getTheDataFunction: () => void;
  createSuccessMessage: (text: string) => void;
  createErrorMessage: (text: string) => void;
}

const Expenses = ({
  activities,
  onEdit,
  onCopy,
  toggleFunction,
  getTheDataFunction,
  createSuccessMessage,
  createErrorMessage,
}: Props) => {
  const [categoryState, setCategoryState] = useState("");
  const [currencyState, setCurrencyState] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const filterCategory = (activity: UserInputType) =>
    categoryState ? activity.category === categoryState : true;

  const currencyCategory = (activity: UserInputType) =>
    currencyState ? activity.currency === currencyState : true;

  const copiedActivities = [...activities];

  const filteredActivities = copiedActivities
    .filter(filterCategory)
    .filter(currencyCategory);
  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = filteredActivities.slice(startIndex, endIndex);

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

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
              {currentPageData.map((activity) => (
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
                      }}
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </IconButton>
                    <IconButton
                      variant="copy"
                      onClick={() => {
                        onCopy(activity.id!);
                      }}
                    >
                      <FontAwesomeIcon icon={faCopy} />
                    </IconButton>
                    <IconButton
                      variant="delete"
                      onClick={() => {
                        deleteData(activity.id!)
                          .then(() => {
                            createSuccessMessage(
                              "Changes have been made successfully!"
                            );
                            getTheDataFunction();
                          })
                          .catch((err) => {
                            createErrorMessage(err.message);
                          });
                      }}
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
        <div>
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              style={{
                fontWeight: currentPage === index + 1 ? "bold" : "normal",
              }}
            >
              {index + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
          <select
            value={itemsPerPage}
            onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
          >
            <option value={5}>5 items per page</option>
            <option value={10}>10 items per page</option>
            <option value={15}>15 items per page</option>
            <option value={20}>20 items per page</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default Expenses;
