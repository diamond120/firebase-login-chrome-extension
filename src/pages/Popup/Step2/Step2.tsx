import React from 'react';
import Button from '@pages/popup/Button/Button';
import '@pages/popup/Step2/Step2.css';

type Step2Props = {
  action: () => void
};

const Step2: React.FC<Step2Props> = ({ action }) => {
  return (
    <div className="step2-container">
      <Button label="Login with Google" action={action} />
    </div>
  );
};

export default Step2;
