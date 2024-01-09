export const EUR = 380;
export const USD = 340;
import { UserInputType } from "../types/UserInput";

export const calculatedAmount = (amount: UserInputType[]) => {
  amount.reduce((acc, activity) => {
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
