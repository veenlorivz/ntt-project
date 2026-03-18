import { Form } from 'react-bootstrap';

const AppInput = ({ label, type = "text", name, value, onChange, placeholder, className = "", required = false, as = "input", rows }) => {
  return (
    <Form.Group className={`mb-3 ${className}`}>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        as={as}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
      />
    </Form.Group>
  );
};

export default AppInput;
