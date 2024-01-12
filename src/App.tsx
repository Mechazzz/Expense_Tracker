import { useState } from "react";
import "./App.css";
import Expenses from "./Components/Expenses";
import Modal from "./Components/Modal";
import { UserInputType } from "./types/UserInput";
import { useLocalStorage } from "./hooks/useLocalStorage";
import Charts from "./Components/Charts";
import Navbar from "./Components/Navbar";

function App() {
  const [localState, setLocalState] = useLocalStorage("activities", []);
  const [activities, setActivities] = useState<UserInputType[]>(localState);
  const [selectedActivity, setSelectedActivity] = useState<UserInputType>("");

  const handleFormSubmit = (userInput: UserInputType) => {
    const newActivity = {
      id: activities.length + 1,
      date: new Date(),
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
      <Navbar />
      <Expenses
        activities={activities}
        onDelete={(id) => {
          setActivities(activities.filter((item) => item.id !== id));
          setLocalState(activities.filter((item) => item.id !== id));
        }}
        onEdit={(id) => {
          setSelectedActivity(activities.find((item) => item.id === id)!);
        }}
      />
      <Modal
        onSubmitFromApp={handleFormSubmit}
        selectedActivity={selectedActivity}
      />
      <br />
      <Charts activities={activities} />
    </>
  );
}

export default App;
