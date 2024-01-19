import "../Styling/Button.css";

const Button = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <button {...props} className="buttonStyle" />;
};

export default Button;
