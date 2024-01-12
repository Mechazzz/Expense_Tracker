import "../Styling/Modal.css";

interface Props {
  children: React.ReactNode;
  modal: boolean;
}

const Modal = ({ children, modal }: Props) => {
  return (
    <>
      {modal && (
        <div className="modal">
          <div className="overlay"></div>
          <div className="modal-content">{children}</div>
        </div>
      )}
    </>
  );
};

export default Modal;
