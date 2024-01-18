import "../Styling/Modal.css";

interface Props {
  children: React.ReactNode;
  modal: boolean;
  closeButtonFunction: () => void;
}

const Modal = ({ children, modal, closeButtonFunction }: Props) => {
  return (
    <>
      {modal && (
        <div className="modal">
          <div
            className="overlay"
            onClick={(e) => {
              e.preventDefault();
              closeButtonFunction();
            }}
          ></div>
          <div className="modal-content">{children}</div>
        </div>
      )}
    </>
  );
};

export default Modal;
