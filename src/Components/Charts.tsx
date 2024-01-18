import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "../Styling/Charts.css";
import { UserInputType } from "../types/UserInput";
import { calculatedAmount } from "../utils/utils.tsx";
import { v4 as uniqueId } from "uuid";

interface Props {
  activities: UserInputType[];
}

const Charts = ({ activities }: Props) => {
  const barChartId = uniqueId();
  const pieChartId = uniqueId();
  const expensesData = [
    {
      name: "Free time",
      expense: calculatedAmount(
        activities.filter(
          (activity: UserInputType) => activity.category === "Free time"
        )
      ),
    },
    {
      name: "Business",
      expense: calculatedAmount(
        activities.filter(
          (activity: UserInputType) => activity.category === "Business"
        )
      ),
    },
    {
      name: "Household",
      expense: calculatedAmount(
        activities.filter(
          (activity: UserInputType) => activity.category === "Household"
        )
      ),
    },
    {
      name: "Others",
      expense: calculatedAmount(
        activities.filter(
          (activity: UserInputType) => activity.category === "Others"
        )
      ),
    },
  ];

  const introOfExpense = (label: string) => {
    if (label === "Free time") {
      return "Total Expense in case of Free Time Category";
    }
    if (label === "Business") {
      return "Total Expense in case of Business Category";
    }
    if (label === "Household") {
      return "Total Expense in case of Household Category";
    }
    if (label === "Others") {
      return "Total Expense in case of Others Category";
    }
    return "";
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label} : ${payload[0].value} USD`}</p>
          <p className="intro">{introOfExpense(label)}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <div className="charts">
        <ResponsiveContainer width="100%" aspect={2}>
          <PieChart width={400} height={400} id={pieChartId}>
            <Pie
              dataKey="expense"
              isAnimationActive={true}
              data={expensesData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="var(--charts-bar-fill)"
              label={{ stroke: "var(--charts-primary-font-color)" }}
            />
            <Tooltip
              wrapperStyle={{
                backgroundColor: "var(--charts-toolTip-background)",
                color: "var(--primary-font-color)",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="100%" aspect={2}>
          <BarChart
            width={500}
            height={300}
            data={expensesData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            id={barChartId}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              tick={{ stroke: "var(--charts-primary-font-color)" }}
            />
            <YAxis tick={{ stroke: "var(--charts-primary-font-color)" }} />
            <Tooltip
              cursor={{ fill: "var(--charts-toolTip-cursor-fill)" }}
              content={<CustomTooltip />}
              wrapperStyle={{
                width: 300,
                backgroundColor: "var(--charts-toolTip-background)",
                color: "var(--primary-font-color)",
              }}
            />
            <Bar dataKey="expense" fill="var(--charts-bar-fill)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default Charts;
