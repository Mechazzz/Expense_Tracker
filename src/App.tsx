/* import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg' */
import { useState } from "react";
import "./App.css";
import Expenses from "./assets/Components/Expenses";
import Modal from "./assets/Components/Modal";

function App() {
  const [activities, setActvities] = useState([
    {
      id: 1,
      activity: "buying fotball ticket",
      category: "sport",
      amount: 200,
      currency: "USD",
    },
    {
      id: 2,
      activity: "buying fuel",
      category: "car",
      amount: 300,
      currency: "USD",
    },
    {
      id: 3,
      activity: "buying gym ticket",
      category: "sport",
      amount: 150,
      currency: "USD",
    },
    {
      id: 4,
      activity: "renovating the house",
      category: "home",
      amount: 100,
      currency: "USD",
    },
  ]);

  return (
    <>
      <Expenses
        activities={activities}
        onDelete={(id) =>
          setActvities(activities.filter((item) => item.id !== id))
        }
      />
      <br />
      <Modal />
    </>
  );
}

export default App;
