import { useState } from "react";
import "./App.css";
import Expenses from "./Components/Expenses";
import Modal from "./Components/Modal";
import { UserInputType } from "./types/UserInput";
import { useLocalStorage } from "./hooks/useLocalStorage";
import Charts from "./Components/Charts";

function App() {
  const [localState, setLocalState] = useLocalStorage("activities", []);
  const [activities, setActivities] = useState<UserInputType[]>(localState);

  const handleFormSubmit = (userInput: UserInputType) => {
    const currentTime = new Date();
    const dateOfExpense = currentTime.toLocaleString();
    const newActivity = {
      id: activities.length + 1,
      date: dateOfExpense,
      ...userInput,
    };

    setActivities((prevActivities: UserInputType[]) => [
      ...prevActivities,
      newActivity,
    ]);
    setLocalState([...activities, newActivity]);

    console.log("New activity added:", newActivity);
  };

  return (
    <>
      <Expenses
        activities={activities}
        onDelete={(id) => {
          setActivities(activities.filter((item) => item.id !== id));
          setLocalState(activities.filter((item) => item.id !== id));
        }}
      />
      <Modal onSubmitFromApp={handleFormSubmit} />
      <br />
      <Charts activities={activities} />
    </>
  );
}

export default App;
