import React, { useState, CSSProperties } from 'react';
import Button from '@pages/popup/Button/Button';
import '@pages/popup/SuccessPage/SuccessPage.css';

import { ClipLoader } from 'react-spinners';

const override: CSSProperties = {
  marginBottom: '0',
};

type SuccessPageProps = {
  authToken?: string;
  action: () => void;
  signOut: () => void;
};

const SuccessPage: React.FC<SuccessPageProps> = ({ action, signOut }) => {
  const fillOutPage = (): void => {
    action();
    setTimeout((): void => {
      setFillingPage(false);
    }, 1000);
  };

  const [fillingPage, setFillingPage] = useState<boolean>(false);

  return (
    <div className="success-page-container">
      <ClipLoader
        color="#fff"
        loading={fillingPage}
        cssOverride={override}
        size={60}
        aria-label="Filling out Page"
        data-testid="loader"
      />

      {!fillingPage && <Button label="Fill out Page" action={fillOutPage} disabled={fillingPage} />}
      <br/>
      <br/>
      <Button label="Sign Out" action={signOut} />
    </div>
  );
};

export default SuccessPage;
