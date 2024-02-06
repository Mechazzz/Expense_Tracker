import { UserInputType } from "../types/UserInput";
import { EUR, HUF } from "./constants";

export const filterCategory = (state: string, activity: UserInputType) =>
  state ? activity.category === state : true;

export const currencyCategory = (state: string, activity: UserInputType) =>
  state ? activity.currency === state : true;

export const expenseAmountInUSD = (activities: UserInputType[]) => {
  return activities.reduce((acc, activity) => {
    switch (activity.currency) {
      case "HUF":
        return activity.amount / HUF + acc;
      case "EUR":
        return activity.amount * EUR + acc;
      default:
        return activity.amount + acc;
    }
  }, 0);
};

export const totalExpensePerCategory = (
  activities: UserInputType[],
  category: string
) => {
  return expenseAmountInUSD(
    activities.filter((activity) => activity.category === category)
  ).toFixed(2);
};

export const currencyChanger = (entry: UserInputType): number => {
  switch (entry.currency) {
    case "HUF":
      return entry.amount / HUF;
    case "EUR":
      return entry.amount * EUR;
    default:
      return entry.amount;
  }
};

export const filterActivitiesByYear = (
  activities: UserInputType[],
  year: number
) => activities.filter((entry) => new Date(entry.date!).getFullYear() === year);

export const filterActivitiesByMonth = (
  activities: UserInputType[],
  year: number,
  month: number
) =>
  activities
    .filter((entry) => new Date(entry.date!).getFullYear() === year)
    .filter((entry) => new Date(entry.date!).getMonth() === month);

export const totalAmountPerYear = (array: UserInputType[], year: number) => {
  const filteredYears = filterActivitiesByYear(array, year);
  let totalAmount = expenseAmountInUSD(filteredYears);
  totalAmount = parseFloat(totalAmount.toFixed(2));
  return totalAmount;
};

export const mostExpensiveActivityOfTheYear = (
  array: UserInputType[],
  year: number
) => {
  const filteredActivities = filterActivitiesByYear(array, year);
  const expensiveActivity: UserInputType = filteredActivities.reduce(
    (maxEntry, currentEntry) => {
      if (
        maxEntry === null ||
        currencyChanger(currentEntry) > currencyChanger(maxEntry)
      ) {
        return currentEntry;
      } else {
        return maxEntry;
      }
    },
    filteredActivities[0]
  );
  return expensiveActivity;
};

export const newDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  /*  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0"); */

  return `${day}/${month}/${year}`;
};

/* ${hours}:${minutes} */
