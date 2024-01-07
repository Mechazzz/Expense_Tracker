import { useState } from "react";
import UserInput from "./UserInput";
import { UserInputType } from "../types/UserInput";

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
      <button onClick={toggleFunction}>Addig new Activity</button>
      {modal && (
        <div>
          <div onClick={toggleFunction}></div>
          <div>
            <h2>Title</h2>
            <p>The Long Text</p>
            <UserInput onSubmitUserInput={handleSubmitFormInModal} />
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
