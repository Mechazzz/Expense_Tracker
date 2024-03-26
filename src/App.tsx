import { useState } from "react";
import "./Styling/App.css";
import Expenses from "./Components/Expenses";
import Modal from "./Components/Modal";
import { UserInputType } from "./types/UserInputType";
import UserInput from "./Components/UserInput";
import { defaultValues } from "./utils/constants";
import { v4 as uniqueId } from "uuid";
import { useEffect } from "react";
import { useMessageSettings } from "./Providers/MessageProvider";
import { modifyData, getData, postData } from "./api/expenses";

function App() {
  const [activities, setActivities] = useState<UserInputType[]>([]);

  const { createSuccessMessage, createErrorMessage } = useMessageSettings();

  const getTheDataFunction = () => {
    getData()
      .then((res) => {
        setActivities(res);
      })
      .catch((err) => {
        createErrorMessage(err.message);
      });
  };

  useEffect(() => {
    getTheDataFunction();
  }, []);

  const [selectedActivity, setSelectedActivity] =
    useState<UserInputType>(defaultValues);

  const [modal, setModal] = useState(false);
  const toggleFunction = () => {
    setModal(!modal);
  };

  const handleFormSubmit = (userInput: UserInputType) => {
    const newActivity = {
      id: uniqueId(),
      ...userInput,
    };

    if (selectedActivity.id) {
      modifyData(selectedActivity.id!, userInput)
        .then(() => {
          createSuccessMessage("Changes have been made successfully!");
        })
        .catch((err) => {
          createErrorMessage(err.message);
        });
    } else {
      postData(newActivity)
        .then(() => {
          createSuccessMessage("Changes have been made successfully!");
        })
        .catch((err) => {
          createErrorMessage(err.message);
        });
    }
    getTheDataFunction();
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
          createSuccessMessage={createSuccessMessage}
          createErrorMessage={createErrorMessage}
          getTheDataFunction={getTheDataFunction}
          toggleFunction={toggleFunction}
          activities={activities}
          onEdit={(id) => {
            setSelectedActivity(activities.find((item) => item.id === id)!);
            toggleFunction();
          }}
          onCopy={(id) => {
            const foundActivity = activities.find((item) => item.id === id)!;
            const newId = uniqueId();
            const newFoundActivity = { ...foundActivity, id: newId };
            console.log(newFoundActivity);
            postData(newFoundActivity);
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
