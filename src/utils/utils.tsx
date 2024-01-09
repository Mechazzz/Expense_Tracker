import { UserInputType } from "../types/UserInput";
import { EUR, USD } from "./constants";

export const calculatedAmount = (amount: UserInputType[]) => {
  return amount.reduce((acc, activity) => {
    switch (activity.currency) {
      case "USD":
        return activity.amount * USD + acc;
      case "EUR":
        return activity.amount * EUR + acc;
      default:
        return activity.amount + acc;
    }
  }, 0);
};
