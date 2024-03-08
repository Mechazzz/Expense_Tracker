import { useState } from "react";
import "./Styling/App.css";
import Expenses from "./Components/Expenses";
import Modal from "./Components/Modal";
import { UserInputType } from "./types/UserInput";
import { useLocalStorage } from "./hooks/useLocalStorage";
import UserInput from "./Components/UserInput";
import { defaultValues } from "./utils/constants";
import { v4 as uniqueId } from "uuid";
import { safeFetch } from "./Components/safeFetch";
import { expense } from "../common/types/expense";

export const deleteData = async (id: string) => {
  console.log("sajt");
  await safeFetch(
    "DELETE",
    `http://localhost:5000/api/expenseData/${id}`,
    expense
  );
};

function App() {
  const [activities, setActivities] = useLocalStorage<UserInputType[]>(
    "activities",
    []
  );

  const [selectedActivity, setSelectedActivity] =
    useState<UserInputType>(defaultValues);

  const [modal, setModal] = useState(false);
  const toggleFunction = () => {
    setModal(!modal);
  };

  const postData = async (newActivity: UserInputType) => {
    console.log(newActivity);
    const response = await safeFetch(
      "POST",
      `http://localhost:5000/api/expenseData`,
      expense,
      newActivity
    );
    return response;
  };

  const handleFormSubmit = (userInput: UserInputType) => {
    const newActivity = {
      id: uniqueId(),
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
      return result;
    });
    postData(newActivity);
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
      <div className="app-container">
        <Expenses
          toggleFunction={toggleFunction}
          activities={activities}
          onDelete={(id) => {
            setActivities(activities.filter((item) => item.id !== id));
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
          }}
        />
        <Modal modal={modal} closeButtonFunction={closeButtonFunction}>
          <h2>New activity</h2>
          <p className="requestMessage">
            Please fill out carefully the below fields
          </p>
          <UserInput
            selectedActivity={selectedActivity}
            onSubmitUserInput={handleFormSubmit}
            closeButtonFunction={closeButtonFunction}
          />
        </Modal>
        <br />
      </div>
    </>
  );
}

export default App;
