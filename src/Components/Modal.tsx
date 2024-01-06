import { useState } from "react";
import UserInput from "./UserInput";

const Modal = ({ onSubmituserInput }) => {
  const [modal, setModal] = useState(false);

  const toggleFunction = () => {
    setModal(!modal);
  };

  const handleSubmitFormInModal = (userInput) => {
    onSubmituserInput(userInput);
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
            <UserInput onSubmituserInput={handleSubmitFormInModal} />
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
