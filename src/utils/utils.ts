import { UserInputType } from "../types/UserInputType";
import { EUR, HUF } from "./constants";

export const filterCategory = (state: string, activity: UserInputType) =>
  state ? activity.category === state : true;

export const currencyCategory = (state: string, activity: UserInputType) =>
  state ? activity.currency === state : true;

export const totalExpenseByYear = (activities: UserInputType[], year: number) =>
  expenseAmountInUSD(
    activities.filter((entry) => new Date(entry.date!).getFullYear() === year)
  );

export const expenseAmountDifferenceByPrevYearAndCurrentYear = (
  activities: UserInputType[],
  momentYear: number
) => {
  const total =
    +totalExpenseByYear(activities, momentYear).toFixed(2) -
    +totalExpenseByYear(activities, momentYear - 1).toFixed(2);
  return total;
};

export const expenseAmountDifferenceByPrevYearAndCurrentYearText = (
  activities: UserInputType[],
  momentYear: number
) => {
  const total = expenseAmountDifferenceByPrevYearAndCurrentYear(
    activities,
    momentYear
  );
  if (total > 0) {
    return `+${total}`;
  }
  if (total < 0) {
    return total;
  }
};

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

export const filteredActivitiesByYearWIthTotalAmounts = (
  activities: UserInputType[],
  year: number
) => {
  const filteredActivitiesByYear = filterActivitiesByYear(activities, year);
  const totalAmountsPerCategory = filteredActivitiesByYear.reduce(
    (acc, activity) => {
      if (acc[activity.category]) {
        acc[activity.category] += currencyChanger(activity);
      } else {
        acc[activity.category] = currencyChanger(activity);
      }
      return acc;
    },
    {} as Record<string, number>
  );
  return totalAmountsPerCategory;
};

export const mostExpensiveCategoryByYear = (
  activities: UserInputType[],
  year: number
) => {
  const expenseAmountsByCategoryArray = Object.entries(
    filteredActivitiesByYearWIthTotalAmounts(activities, year)
  );
  if (expenseAmountsByCategoryArray.length === 0) {
    return 0;
  } else {
    const sortedCategoriesWithAmounts = expenseAmountsByCategoryArray.sort(
      (a, b) => b[1] - a[1]
    );
    const highestAmount = sortedCategoriesWithAmounts[0];
    return `${highestAmount[0]}: ${highestAmount[1].toFixed(2)}`;
  }
};

export const cheapestCategoryByYear = (
  activities: UserInputType[],
  year: number
) => {
  const expenseAmountsByCategoryArray = Object.entries(
    filteredActivitiesByYearWIthTotalAmounts(activities, year)
  );
  if (expenseAmountsByCategoryArray.length === 0) {
    return 0;
  } else {
    const sortedCategoriesWithAmounts = expenseAmountsByCategoryArray.sort(
      (a, b) => a[1] - b[1]
    );
    const highestAmount = sortedCategoriesWithAmounts[0];
    return `${highestAmount[0]}: ${highestAmount[1].toFixed(2)}`;
  }
};

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
