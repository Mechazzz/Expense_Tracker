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
import { useSettings } from "../Providers/SettingsProvider";

interface Props {
  activities: UserInputType[];
}

const Charts = ({ activities }: Props) => {
  const { settings, defaultThemeStyles } = useSettings();
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
  return (
    <div style={defaultThemeStyles[settings.theme]}>
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
                label /* ={(entry) => `${entry.name}: ${entry.value}`} */
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
              <XAxis dataKey="name" tick={{ stroke: "#2d4a69" }} />
              <YAxis tick={{ stroke: "#2d4a69" }} />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="expense"
                fill="#2d4a69"
                /* label={(entry) => entry.value} */
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </>
    </div>
  );
};

export default Charts;
