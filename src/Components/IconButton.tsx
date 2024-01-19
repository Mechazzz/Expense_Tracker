import "../Styling/Button.css";

interface IconInterface extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "change" | "delete" | "copy";
}

const Button = (props: IconInterface) => {
  return (
    <button
      {...props}
      className={
        props.variant === "delete"
          ? "deleteButton"
          : props.variant === "change"
          ? "changeButton"
          : "copyButton"
      }
    />
  );
};

export default Button;
