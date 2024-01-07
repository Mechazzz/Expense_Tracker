import { useState } from "react";
import "./App.css";
import Expenses from "./Components/Expenses";
import Modal from "./Components/Modal";
import { UserInputType } from "./types/UserInput";
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
  const [localState, setLocalState] = useLocalStorage("activities", []);
  const [activities, setActvities] = useState<UserInputType[]>(localState);

  const handleFormSubmit = (userInput: UserInputType) => {
    const newActivity = {
      id: activities.length + 1,
      ...userInput,
    };

    setActvities((prevActivities: UserInputType[]) => [
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
          setActvities(activities.filter((item) => item.id !== id));
          setLocalState(activities.filter((item) => item.id !== id));
        }}
      />
      <Modal onSubmitFromApp={handleFormSubmit} />
      <br />
    </>
  );
}

export default App;
