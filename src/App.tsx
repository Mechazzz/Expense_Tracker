import { useState } from "react";
import "./Styling/App.css";
import Expenses from "./Components/Expenses";
import Modal from "./Components/Modal";
import { UserInputType } from "./types/UserInput";
import { useLocalStorage } from "./hooks/useLocalStorage";
import Charts from "./Components/Charts";
import UserInput from "./Components/UserInput";
import { defaultValues } from "./utils/constants";
import { v4 as uniqueId } from "uuid";
import Settings from "./Components/Settings";
import Button from "./Components/Button";

function App() {
  const [localState, setLocalState] = useLocalStorage<UserInputType[]>(
    "activities",
    []
  );
  const [activities, setActivities] = useState<UserInputType[]>(localState);
  const [selectedActivity, setSelectedActivity] =
    useState<UserInputType>(defaultValues);

  const [modal, setModal] = useState(false);
  const toggleFunction = () => {
    setModal(!modal);
  };

  const handleFormSubmit = (userInput: UserInputType) => {
    const newActivity = {
      id: uniqueId(),
      date: new Date(),
      ...userInput,
    };

    setActivities((prevActivities: UserInputType[]) => {
      const result = selectedActivity.id
        ? prevActivities.map((activity) =>
            activity.id === selectedActivity.id
              ? { ...activity, ...userInput }
              : activity
          )
        : [...prevActivities, newActivity];
      setLocalState(result);
      return result;
    });

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
      <Settings />
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
        onCopy={(id) => {
          const foundActivity = activities.find((item) => item.id === id)!;
          const newFoundActivity = {
            ...foundActivity,
            id: uniqueId(),
          };
          setActivities([...activities, newFoundActivity]);
          setLocalState([...activities, newFoundActivity]);
        }}
      />
      <Button onClick={toggleFunction}>Adding new Activity</Button>
      <Modal modal={modal} closeButtonFunction={closeButtonFunction}>
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
