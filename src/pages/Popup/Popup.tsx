import { useMemo, useState } from 'react';
import logo from '@assets/img/logo.svg';
import '@pages/popup/Popup.css';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';

import Step1 from '@pages/popup/Step1/Step1';
import Step2 from '@pages/popup/Step2/Step2';
import SuccessPage from '@pages/popup/SuccessPage/SuccessPage';

import { firebaseApp, FIREBASE_SESSION_KEY } from './firebase_config.js';
import {
  getAuth,
  signInWithCredential,
  signOut,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
} from '@firebase/auth';

import { fetchFileByteData, compressZip } from '@src/utils';

const auth = getAuth(firebaseApp);
setPersistence(auth, browserLocalPersistence);

const checkForFirebaseLogin = () => {
  return localStorage.getItem(FIREBASE_SESSION_KEY);
};

const Popup = () => {
  const [step, setStep] = useState<number>(checkForFirebaseLogin() ? 3 : 1);
  const [authInProgress, setAuthInProgress] = useState(false);
  const [fileInProgress, setFileInProgress] = useState(false);

  const goNextStep = (): void => {
    setStep(step + 1);
  };

  let downloadFiles = [];
  const handler = useMemo(() => {
    return function (message) {
      if (message == 'compress') {
        compressFiles();
      } else if (message.type == 'download') {
        downloadFiles = [...downloadFiles, message];
      }
    };
  }, []);

  chrome.runtime.onMessage.addListener(handler);

  const loginWithGoogle = (): void => {
    startAuth(true);
  };
  const getFileData = async (): Promise<any> => {
    setFileInProgress(true);
    chrome.tabs.query({ active: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, 'scrapeData');
    });
  };

  function startAuth(interactive) {
    setAuthInProgress(true);
    chrome.identity.getAuthToken({ interactive: true }, function (token) {
      //Token:  This requests an OAuth token from the Chrome Identity API.
      if (chrome.runtime.lastError && !interactive) {
        console.log('It was not possible to get a token programmatically.');
      } else if (chrome.runtime.lastError) {
        alert(chrome.runtime.lastError.message);
      } else if (token) {
        const credential = GoogleAuthProvider.credential(null, token);
        signInWithCredential(auth, credential)
          .then(() => {
            localStorage.setItem(FIREBASE_SESSION_KEY, 'Signed in');
            setAuthInProgress(false);
            setStep(step + 1);
          })
          .catch(error => {
            alert(error.message);
          });
      } else {
        console.error('The OAuth token was null');
      }
    });
  }

  const removeAuth = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem(FIREBASE_SESSION_KEY);
        setStep(1);
      })
      .catch(err => {
        alert(err.message);
      });
  };

  const compressFiles = async () => {
    const fetchPromises = [];
    const fileData = [];
    downloadFiles.forEach(async file => {
      const promise = fetchFileByteData(file.url);
      fetchPromises.push(promise);
      fileData.push({
        filename: file.filename,
        content: await promise,
      });
    });

    console.log(
      'Compressing files:',
      fileData.map(file => file.filename),
    );
    await Promise.all(fetchPromises);
    compressZip(fileData);
    setFileInProgress(false);
  };

  return (
    <div className="popup-container">
      <div className="popup-header">
        <img src={logo} className="extension-logo" alt="GrantPal" />
      </div>
      <div className="popup-content">
        {step === 1 && <Step1 action={goNextStep} />}
        {step === 2 && <Step2 action={loginWithGoogle} loading={authInProgress} />}
        {step === 3 && <SuccessPage action={getFileData} loading={fileInProgress} signOut={removeAuth} />}
      </div>

      <div className={`popup-footer ${step === 3 ? 'hidden' : ''}`}>
        Don&apos;t have an account?{' '}
        <a href="google.com" className="signup-link">
          Sign up
        </a>
      </div>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
