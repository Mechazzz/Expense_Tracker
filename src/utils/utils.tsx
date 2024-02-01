import { UserInputType } from "../types/UserInput";
import { EUR, HUF } from "./constants";

export const calculatedAmount = (amount: UserInputType[]) => {
  return amount.reduce((acc, activity) => {
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

export const currencyChanger = (entry: UserInputType) => {
  switch (entry.currency) {
    case "HUF":
      return entry.amount / HUF;
    case "EUR":
      return entry.amount * EUR;
    default:
      return entry.amount;
  }
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
