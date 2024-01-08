import { useState } from "react";
import UserInput from "./UserInput";
import { UserInputType } from "../types/UserInput";
import "../Styling/ModalX.css";

interface Props {
  onSubmitFromApp: (userInput: UserInputType) => void;
}

const Modal = ({ onSubmitFromApp }: Props) => {
  const [modal, setModal] = useState(false);

  const toggleFunction = () => {
    setModal(!modal);
  };

  const handleSubmitFormInModal = (userInput: UserInputType) => {
    onSubmitFromApp(userInput);
    toggleFunction();
  };

  return (
    <>
      <button className="openButton" onClick={toggleFunction}>
        Adding new Activity
      </button>

      {modal && (
        <div className="modal">
          <div className="overlay"></div>
          <div className="modal-content">
            <h2>New activity</h2>
            <p className="requestMessage">
              Please fill out carefully the below fields
            </p>
            <UserInput
              toggleFunction={toggleFunction}
              onSubmitUserInput={handleSubmitFormInModal}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
