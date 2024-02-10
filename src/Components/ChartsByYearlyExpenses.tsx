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
import { UserInputType } from "../types/UserInput.tsx";
import { expenseAmountInUSD } from "../utils/utils.ts";
import { v4 as uniqueId } from "uuid";
import "../Styling/Dashboard.css";

interface Props {
  activities: UserInputType[];
}

const Charts = ({ activities }: Props) => {
  /*   const [activitiesOriginal] = useLocalStorage<UserInputType[]>(
    "activities",
    []
  ); */

  const barChartId = uniqueId();
  const pieChartId = uniqueId();
  const expensesData = [
    {
      name: "Free time",
      expense: expenseAmountInUSD(
        activities.filter(
          (activity: UserInputType) => activity.category === "Free time"
        )
      ),
    },
    {
      name: "Business",
      expense: expenseAmountInUSD(
        activities.filter(
          (activity: UserInputType) => activity.category === "Business"
        )
      ),
    },
    {
      name: "Household",
      expense: expenseAmountInUSD(
        activities.filter(
          (activity: UserInputType) => activity.category === "Household"
        )
      ),
    },
    {
      name: "Others",
      expense: expenseAmountInUSD(
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

  const CustomTooltipBarChart = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const formattedValue = payload[0].value.toFixed(2);
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label} : ${formattedValue} USD`}</p>
          <p className="intro">{introOfExpense(label)}</p>
        </div>
      );
    }

    return null;
  };

  const CustomTooltipPieChart = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0];
      const formattedValue = value.toFixed(2);

      return (
        <div className="custom-tooltip">
          <p className="label">{`${name} : ${formattedValue} USD`}</p>
          <p className="intro">{introOfExpense(name)}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <div className="charts_container">
        <ResponsiveContainer width="100%" height="100%" aspect={1}>
          <div className="charts_wrapper">
            <PieChart width={650} height={340} id={pieChartId}>
              <Pie
                stroke="var(--primary-font-color)"
                dataKey="expense"
                isAnimationActive={true}
                data={expensesData}
                /*                               cx="50%"
                cy="50%"  */
                outerRadius={130}
                fill="var(--charts-bar-fill)"
                label={({
                  cx,
                  cy,
                  midAngle,
                  innerRadius,
                  outerRadius,
                  value,
                }) => {
                  const RADIAN = Math.PI / 180;
                  const radius = 25 + innerRadius + (outerRadius - innerRadius);
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);

                  return (
                    <text
                      x={x}
                      y={y}
                      fill="var(--charts-primary-font-color)"
                      textAnchor={x > cx ? "start" : "end"}
                      dominantBaseline="central"
                    >
                      {`${value.toFixed(2)} USD`}
                    </text>
                  );
                }}
              />
              <Tooltip
                content={<CustomTooltipPieChart />}
                wrapperStyle={{
                  backgroundColor: "var(--charts-toolTip-background)",
                  color: "var(--primary-font-color)",
                }}
              />
            </PieChart>
          </div>
        </ResponsiveContainer>
        <ResponsiveContainer width="100%" height="95%" aspect={2}>
          <BarChart
            width={200}
            height={400}
            data={expensesData}
            margin={{
              top: 30,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            id={barChartId}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              tick={{ fill: "var(--charts-primary-font-color)" }}
            />
            <YAxis tick={{ fill: "var(--charts-primary-font-color)" }} />
            <Tooltip
              cursor={{ fill: "var(--charts-toolTip-cursor-fill)" }}
              content={<CustomTooltipBarChart />}
              wrapperStyle={{
                width: 300,
                backgroundColor: "var(--charts-toolTip-background)",
                color: "var(--primary-font-color)",
              }}
            />
            <Bar
              dataKey="expense"
              fill="var(--charts-bar-fill)"
              stroke="var(--primary-font-color)"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default Charts;
