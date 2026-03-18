import { Button } from 'react-bootstrap';

const AppButton = ({ text, onClick, type = "button", variant = "primary", className = "", disabled = false }) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled}
      variant={variant}
      className={className}
    >
      {text}
    </Button>
  );
};

export default AppButton;
