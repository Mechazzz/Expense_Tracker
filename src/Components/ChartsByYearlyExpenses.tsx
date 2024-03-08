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

  const renderCustomAxisTick = (props) => {
    const { x, y, payload } = props;
    let path = "";
    switch (payload.value) {
      case "Household":
        path =
          "M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z";
        break;
      case "Free time":
        path =
          "M192 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm51.3 182.7L224.2 307l49.7 49.7c9 9 14.1 21.2 14.1 33.9V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V397.3l-73.9-73.9c-15.8-15.8-22.2-38.6-16.9-60.3l20.4-84c8.3-34.1 42.7-54.9 76.7-46.4c19 4.8 35.6 16.4 46.4 32.7L305.1 208H336V184c0-13.3 10.7-24 24-24s24 10.7 24 24v55.8c0 .1 0 .2 0 .2s0 .2 0 .2V488c0 13.3-10.7 24-24 24s-24-10.7-24-24V272H296.6c-16 0-31-8-39.9-21.4l-13.3-20zM81.1 471.9L117.3 334c3 4.2 6.4 8.2 10.1 11.9l41.9 41.9L142.9 488.1c-4.5 17.1-22 27.3-39.1 22.8s-27.3-22-22.8-39.1zm55.5-346L101.4 266.5c-3 12.1-14.9 19.9-27.2 17.9l-47.9-8c-14-2.3-22.9-16.3-19.2-30L31.9 155c9.5-34.8 41.1-59 77.2-59h4.2c15.6 0 27.1 14.7 23.3 29.8z";
        break;
      case "Business":
        path =
          "M184 48H328c4.4 0 8 3.6 8 8V96H176V56c0-4.4 3.6-8 8-8zm-56 8V96H64C28.7 96 0 124.7 0 160v96H192 320 512V160c0-35.3-28.7-64-64-64H384V56c0-30.9-25.1-56-56-56H184c-30.9 0-56 25.1-56 56zM512 288H320v32c0 17.7-14.3 32-32 32H224c-17.7 0-32-14.3-32-32V288H0V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V288z";
        break;
      case "Others":
        path =
          "M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64H348.7c2.2 20.4 3.3 41.8 3.3 64zm28.8-64H503.9c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64H380.8c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32H376.7c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0H167.7c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0H18.6C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192H131.2c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64H8.1C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6H344.3c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352H135.3zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6H493.4z";
        break;
      default:
        path = "";
    }
    return (
      <svg
        x={x - 12}
        y={y + 4}
        width={48}
        height={48}
        viewBox="0 0 1024 1024"
        fill="var(--charts-bar-fill)"
      >
        <path d={path} />
      </svg>
    );
  };

  const renderCustomBarLabel = ({ payload, x, y, width, height, value }) => {
    return (
      <text
        x={x + width / 2}
        y={y}
        fill="#666"
        textAnchor="middle"
        dy={-6}
      ></text>
    );
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
        <ResponsiveContainer width="100%" height="95%" aspect={2.3}>
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
            <XAxis dataKey="name" tick={renderCustomAxisTick} />
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
              label={renderCustomBarLabel}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default Charts;
