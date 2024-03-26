import { UserInputType } from "../types/UserInputType";
import { safeFetch } from "../Components/safeFetch";
import { expense } from "../../common/types/expense";

export const modifyData = async (id: string, activity: UserInputType) => {
  const encodedID = encodeURIComponent(id);
  const response = await safeFetch(
    "PATCH",
    `http://localhost:5000/api/modifyExpense/${encodedID}`,
    expense,
    activity
  );
  if (response.success) {
    return response.data;
  } else {
    throw Error(response.error);
  }
};

export const getData = async () => {
  const response = await safeFetch(
    "GET",
    `http://localhost:5000/api/allExpenseData`,
    expense.array()
  );
  if (response.success) {
    return response.data;
  } else {
    throw Error(response.error);
  }
};

export const postData = async (newActivity: UserInputType) => {
  const response = await safeFetch(
    "POST",
    `http://localhost:5000/api/expenseData`,
    expense,
    newActivity
  );
  if (response.success) {
    return response.data;
  } else {
    throw Error(response.error);
  }
};

export const deleteData = async (id: string) => {
  const encodedID = encodeURIComponent(id);
  const response = await safeFetch(
    "DELETE",
    `http://localhost:5000/api/expenseData/${encodedID}`,
    expense
  );
  if (response.success) {
    return response.data;
  } else {
    throw Error(response.error);
  }
};
