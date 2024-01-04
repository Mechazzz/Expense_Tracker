import { useState } from "react";

const Modal = () => {
  const [modal, setModal] = useState(false);

  const toggleFunction = () => {
    setModal(!modal);
  };

  return (
    <>
      <button onClick={toggleFunction}>OPEN</button>
      {modal && (
        <div>
          <div onClick={toggleFunction}></div>
          <div>
            <h2>Title</h2>
            <p>The Long Text</p>
            <button onClick={toggleFunction}>CLOSE</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
