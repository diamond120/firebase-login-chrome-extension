import React from 'react';
import Button from '@pages/popup/Button/Button';
import '@pages/popup/Step2/Step2.css';
import { ClipLoader } from 'react-spinners';
import { CSSProperties } from 'react';

type Step2Props = {
  action: () => void;
  loading: boolean;
};

const override: CSSProperties = {
  marginTop: 50,
};

const Step2: React.FC<Step2Props> = ({ action, loading }) => {
  return (
    <div className="step2-container">
      <Button label="Login with Google" action={action} />
      <ClipLoader
        color="#fff"
        loading={loading}
        cssOverride={override}
        size={60}
        aria-label="Filling out Page"
        data-testid="loader"
      />
    </div>
  );
};

export default Step2;
