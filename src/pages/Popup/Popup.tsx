import React, { useEffect, useState } from 'react';
import logo from '@assets/img/logo.svg';
import '@pages/popup/Popup.css';
// import useStorage from '@src/shared/hooks/useStorage';
// import exampleThemeStorage from '@src/shared/storages/exampleThemeStorage';

import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';

import Step1 from '@pages/popup/Step1/Step1';
import Step2 from '@pages/popup/Step2/Step2';
import SuccessPage from '@pages/popup/SuccessPage/SuccessPage';

import { firebaseApp } from './firebase_config.js'
import {
    getAuth,
    onAuthStateChanged,
    signInWithCredential,
    GoogleAuthProvider,
    setPersistence,
    signInWithRedirect,
    signInWithPopup,
    browserLocalPersistence
} from '@firebase/auth';

import { Provider, useDispatch, useSelector } from 'react-redux';
 import { setScrapedData } from '@root/src/store/actions';

const auth = getAuth(firebaseApp);
setPersistence(auth, browserLocalPersistence)



const Popup = () => {
  // const theme = useStorage(exampleThemeStorage);

  const [step, setStep] = useState<number>(1);
   const scrapedData  = useSelector(state => state.scrapedData);
   const dispatch = useDispatch();

  const goNextStep = (): void => {
    setStep(step + 1);
  };


  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    dispatch(setScrapedData(message));
    fillOutForms();
  });

  const loginWithGoogle = (): void => {
    startAuth(true);
  }
  const scrapeData = (): void => {
    chrome.tabs.query({ active: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, 'scrapeData');
      });
  }

  const fillOutForms = (): void => {
    chrome.tabs.query({ active: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, 'fillOut');
      });
  }

  function startAuth(interactive) {
    // const provider = new GoogleAuthProvider( );
    //         signInWithPopup(auth, provider).then(result => {
    //             alert(result);
    //         }).catch(err => {
    //           alert(JSON.stringify(err));
    //         })
    chrome.identity.getAuthToken({ interactive: true }, function (token) {
        //Token:  This requests an OAuth token from the Chrome Identity API.
        if (chrome.runtime.lastError && !interactive) {
            console.log('It was not possible to get a token programmatically.');
        } else if (chrome.runtime.lastError) {
            alert(chrome.runtime.lastError.message);
        } else if (token) {
            // Follows: https://firebase.google.com/docs/auth/web/google-signin
            // Authorize Firebase with the OAuth Access Token.
            // Builds Firebase credential with the Google ID token.
             const credential = GoogleAuthProvider.credential(null, token);
            //  setStep(step + 1);
            signInWithCredential(auth, credential).then((result) => {
               chrome.tabs.create({ url: "https://firebase.google.com", active: false }, function(tab) {
                  console.log('New tab opened with Firebase URL');
                  setStep(step + 1);
              });
              //alert("Sign in by " + result.user.displayName);
            }).catch((error) => {
              alert(error.message);
            });

            
        } else {
            console.error('The OAuth token was null');
        }
    });
}



  return (
    <div className="popup-container">
      <div className="popup-header">
        <img src={logo} className="extension-logo" alt="GrantPal" />
      </div>
      <div className="popup-content">
        {step === 1 && <Step1 action={goNextStep} />}
        {step === 2 && <Step2 action={loginWithGoogle} />}
        {step === 3 && <SuccessPage action={scrapeData}/>}
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
