import { useEffect } from "react";
import { MessagesType } from "../types/MessageProviderInterfaces";
import "../Styling/Snackbar.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface SnackbarProps {
  message: MessagesType;
  clearSeenMessage: (id: string) => void;
  offset: number;
}

const Snackbar = ({ message, clearSeenMessage, offset }: SnackbarProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("Offset:", offset);
      clearSeenMessage(message.id);
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleClick = () => {
    clearSeenMessage(message.id);
  };

  return (
    <>
      <div className="Snackbar" style={{ top: `${offset}px` }}>
        <div
          className={`Snackbar_inner ${
            message.text === "Changes have been made successfully!"
              ? "Snackbar_success"
              : "Snackbar_error"
          }`}
        >
          {message.text}
          <button className="xButton" onClick={handleClick}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        {/*         <div
          className={`${
            message.text === "Changes have been made successfully!"
              ? "SnackbarButton_success"
              : "SnackbarButton_error"
          }`}
        >
          <button onClick={handleClick}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div> */}
      </div>
    </>
  );
};

export default Snackbar;
