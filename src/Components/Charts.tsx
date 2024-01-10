import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  Rectangle,
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

interface Props {
  activities: UserInputType[];
}

const Charts = ({ activities }: Props) => {
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
    <>
      <div className="charts">
        <ResponsiveContainer width="100%" aspect={2}>
          <PieChart width={400} height={400}>
            <Pie
              dataKey="expense"
              isAnimationActive={true}
              data={expensesData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
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
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ stroke: "brown" }} />
            <YAxis tick={{ stroke: "brown" }} />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="expense"
              fill="#8884d8"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default Charts;