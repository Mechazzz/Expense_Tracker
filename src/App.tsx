import { useState } from "react";
import "./Styling/App.css";
import Expenses from "./Components/Expenses";
import Modal from "./Components/Modal";
import { UserInputType } from "./types/UserInput";
/* import { useLocalStorage } from "./hooks/useLocalStorage"; */
import UserInput from "./Components/UserInput";
import { defaultValues } from "./utils/constants";
import { v4 as uniqueId } from "uuid";
import { safeFetch } from "./Components/safeFetch";
import { expense } from "../common/types/expense";
import { useEffect } from "react";

function App() {
  const [activities, setActivities] = useState<UserInputType[]>([]);

  const modifyData = async (id: string, activity: UserInputType) => {
    try {
      const encodedID = encodeURIComponent(id);
      await safeFetch(
        "PATCH",
        `http://localhost:5000/api/modifyExpense/${encodedID}`,
        expense,
        activity
      );
      getTheDataFunction();
    } catch (error) {
      console.log("Fatal error at modifyData");
    }
  };

  const getData = async () => {
    const response = await safeFetch(
      "GET",
      `http://localhost:5000/api/allExpenseData`,
      expense.array()
    );
    if (response.success) {
      return response;
    }
    throw Error();
  };

  const getTheDataFunction = () => {
    getData()
      .then((res) => setActivities(res.data))
      .catch((err) => console.log("Fatal error at getData", err));
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

  const postData = async (newActivity: UserInputType) => {
    try {
      console.log(newActivity);
      await safeFetch(
        "POST",
        `http://localhost:5000/api/expenseData`,
        expense,
        newActivity
      );
      getTheDataFunction();
    } catch (error) {
      console.log("Fatal error at modifyData");
    }
  };

  //------------------------------
  const handleFormSubmit = (userInput: UserInputType) => {
    const newActivity = {
      id: uniqueId(),
      ...userInput,
    };

    if (selectedActivity.id) {
      modifyData(selectedActivity.id!, userInput);
    } else {
      postData(newActivity);
    }
    setSelectedActivity(defaultValues);
    toggleFunction();
    console.log("New activity added:", newActivity);
  };

  //------------------------------

  /*   const handleFormSubmit = (userInput: UserInputType) => {
    const newActivity = {
      id: uniqueId(),
      ...userInput,
    }; */

  /*     setActivities((prevActivities: UserInputType[]) => {
      const selectedID = selectedActivity.id;
      const result = selectedActivity.id
        ? prevActivities.map((activity) =>
            activity.id === selectedActivity.id
              ? { ...activity, ...userInput }
              : activity
          )
        : [...prevActivities, newActivity];
      return result;
    }); */

  /*     modifyData(selectedActivity.id!, userInput);
    postData(newActivity);
    setSelectedActivity(defaultValues);
    toggleFunction();

    console.log("New activity added:", newActivity);
  }; */

  //------------------------------

  const closeButtonFunction = () => {
    toggleFunction();
    setSelectedActivity(defaultValues);
  };

  return (
    <>
      <div className="app-container">
        <Expenses
          getTheDataFunction={getTheDataFunction}
          toggleFunction={toggleFunction}
          activities={activities}
          /*           onDelete={(id) => {
            setActivities(activities.filter((item) => item.id !== id));
          }} */
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
