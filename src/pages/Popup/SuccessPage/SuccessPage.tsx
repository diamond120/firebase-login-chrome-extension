import React, { CSSProperties } from 'react';
import Button from '@pages/popup/Button/Button';
import '@pages/popup/SuccessPage/SuccessPage.css';

import { ClipLoader } from 'react-spinners';

const override: CSSProperties = {
  marginBottom: '0',
};

type SuccessPageProps = {
  authToken?: string;
  action: () => void;
  loading: boolean;
  signOut: () => void;
};

const SuccessPage: React.FC<SuccessPageProps> = ({ action, loading, signOut }) => {
  return (
    <div className="success-page-container">
      <ClipLoader
        color="#fff"
        loading={loading}
        cssOverride={override}
        size={60}
        aria-label="Getting files Page"
        data-testid="loader"
      />

      {!loading && <Button label="Get All Files" action={action} disabled={loading} />}
      <br />
      <br />
      <Button label="Sign Out" action={signOut} />
    </div>
  );
};

export default SuccessPage;
