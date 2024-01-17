import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
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
              fill="#2d4a69"
              label
            />
            <Tooltip />
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
            <XAxis dataKey="name" tick={{ stroke: "var(--barChart-colors)" }} />
            <YAxis tick={{ stroke: "var(--barChart-colors)" }} />
            <Tooltip
              cursor={{ fill: "var(--toolTip-cursor-fill)" }}
              content={<CustomTooltip />}
              wrapperStyle={{
                width: 300,
                backgroundColor: "var(--barChart--ToolTop--background)",
                color: "var(--primary-darkMode-font-color)",
              }}
            />
            <Bar dataKey="expense" fill="var(--primary-darkMode-color)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default Charts;
