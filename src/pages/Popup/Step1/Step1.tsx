import React from 'react';
import Button from '@pages/popup/Button/Button';
import '@pages/popup/Step1/Step1.css';

type Step1Props = {
  action: () => void;
};

const Step1: React.FC<Step1Props> = ({ action }) => {
  return (
    <div className="step1-container">
      <div className="step1-text-area">
        <div className="step1-text"> Write Grants 10x Faster with</div>
        <div className="step1-text"> Our Automation Tool</div>
      </div>

      <Button label="Login" action={action} />
    </div>
  );
};

export default Step1;
