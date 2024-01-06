/* import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg' */
import { useState } from "react";
import "./App.css";
import Expenses from "./Components/Expenses";
import Modal from "./Components/Modal";

function App() {
  type userInput = {
    activity: string;
    category: string;
    amount: number;
    currency: string;
  };

  const [activities, setActvities] = useState([
    {
      id: 0,
      activity: "",
      category: "",
      amount: 0,
      currency: "",
    },
  ]);

  //----------------------------------------------
  const handleFormSubmit = (userInput: userInput) => {
    const newActivity = {
      id: activities.length + 1,
      ...userInput,
    };

    setActvities((prevActivities) => [...prevActivities, newActivity]);

    console.log("New activity added:", newActivity);
  };
  //------------------------------------

  return (
    <>
      <Expenses
        activities={activities}
        onDelete={(id) =>
          setActvities(activities.filter((item) => item.id !== id))
        }
      />
      <Modal onSubmituserInput={handleFormSubmit} />
      <br />
    </>
  );
}

export default App;
