import "../Styling/Expenses.css";

interface Activity {
  id: number;
  activity: string;
  category: string;
  amount: number;
  currency: string;
}

interface Props {
  activities: Activity[];
  onDelete: (id: number) => void;
}

const Expenses = ({ activities, onDelete }: Props) => {
  if (activities.length === 0) return null;
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Activity description</th>
          <th>Category</th>
          <th>Amount of Money</th>
          <th>Currency</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {activities.map((activity) => (
          <tr key={activity.id}>
            <td>{activity.activity}</td>
            <td>{activity.category}</td>
            <td>{activity.amount}</td>
            <td>{activity.currency}</td>
            <td>
              <button onClick={() => onDelete(activity.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td>Total Expenses</td>
          <td>
            {activities
              .reduce((acc, activity) => activity.amount + acc, 0)
              .toFixed(2)}
          </td>
          <td></td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  );
};

export default Expenses;
