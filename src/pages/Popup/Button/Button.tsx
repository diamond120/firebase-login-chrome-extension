import React from 'react';
import '@pages/popup/Button/Button.css';

type ButtonProps = {
  label: string;
  action: () => void;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({ label, action, disabled = false }) => {
  return (
    <button className="grantpal-button" onClick={action} disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;
