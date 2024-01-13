import { useState } from "react";
import "./App.css";
import Expenses from "./Components/Expenses";
import Modal from "./Components/Modal";
import { UserInputType } from "./types/UserInput";
import { useLocalStorage } from "./hooks/useLocalStorage";
import Charts from "./Components/Charts";
import Navbar from "./Components/Navbar";
import UserInput from "./Components/UserInput";
import { defaultValues } from "./utils/constants";

function App() {
  const [localState, setLocalState] = useLocalStorage("activities", []);
  const [activities, setActivities] = useState<UserInputType[]>(localState);
  const [selectedActivity, setSelectedActivity] =
    useState<UserInputType>(defaultValues);

  const [modal, setModal] = useState(false);
  const toggleFunction = () => {
    setModal(!modal);
  };

  const handleFormSubmit = (userInput: UserInputType) => {
    const newActivity = {
      id: activities.length + 1,
      date: new Date(),
      ...userInput,
    };

    setActivities((prevActivities: UserInputType[]) =>
      selectedActivity
        ? prevActivities.map((activity) =>
            activity.id === selectedActivity.id
              ? { ...activity, ...userInput }
              : activity
          )
        : [...prevActivities, newActivity]
    );

    setLocalState([...activities, newActivity]);
    setSelectedActivity(defaultValues);
    toggleFunction();

    console.log("New activity added:", newActivity);
  };

  const closeButtonFunction = () => {
    toggleFunction();
    setSelectedActivity(defaultValues);
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
          toggleFunction();
        }}
      />
      <button className="openButton" onClick={toggleFunction}>
        Adding new Activity
      </button>
      <Modal modal={modal}>
        <h2>New activity</h2>
        <p className="requestMessage">
          Please fill out carefully the below fields
        </p>
        <UserInput
          selectedActivity={selectedActivity}
          toggleFunction={toggleFunction}
          onSubmitUserInput={handleFormSubmit}
          closeButtonFunction={closeButtonFunction}
        />
      </Modal>
      <br />
      <Charts activities={activities} />
    </>
  );
}

export default App;
