import "../Styling/Button.css";

interface IconInterface extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "change" | "delete" | "copy" | "";
}

const IconButton = ({ variant, ...props }: IconInterface) => {
  return (
    <button
      {...props}
      className={["iconButton", `iconButton-${variant}`].join(" ")}
    />
  );
};

export default IconButton;
