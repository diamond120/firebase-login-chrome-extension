import { createRoot } from 'react-dom/client';
import App from '@pages/content/ui/app';
import refreshOnUpdate from 'virtual:reload-on-update-in-view';
import injectedStyle from './injected.css?inline';
import { callAPI } from './api';

refreshOnUpdate('pages/content');

const root = document.createElement('div');
root.id = 'chrome-extension-boilerplate-react-vite-content-view-root';

document.body.append(root);

const rootIntoShadow = document.createElement('div');
rootIntoShadow.id = 'shadow-root';

const shadowRoot = root.attachShadow({ mode: 'open' });
shadowRoot.appendChild(rootIntoShadow);

/** Inject styles into shadow dom */
const styleElement = document.createElement('style');
styleElement.innerHTML = injectedStyle;

document.body.append(styleElement);

function getDownloadLinks() {
  const anchors = document.querySelectorAll('a');
  const ret = [];
  anchors.forEach(anchor => {
    const innerStr = anchor.innerHTML;
    if (innerStr.includes('.zip') || innerStr.includes('.pdf')) {
      ret.push(anchor);
    }
  });
  return ret;
}
async function delay() {
  return new Promise(resolve => setTimeout(resolve, 2600));
}
// Send scraped data back to the extension
chrome.runtime.onMessage.addListener(function (message) {
  if (message === 'scrapeData') {
    const downloadLinks = getDownloadLinks();
    console.log('Total downloads:', downloadLinks.length);
    downloadLinks
      .reduce((seq, link) => {
        return seq.then(() => {
          link.click();
          console.log('Downloading file:', link.innerHTML);
          return delay();
        });
      }, Promise.resolve())
      .then(() => {
        chrome.runtime.sendMessage('compress');
      });
  }
});

/**
 * https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite/pull/174
 *
 * In the firefox environment, the adoptedStyleSheets bug may prevent contentStyle from being applied properly.
 * Please refer to the PR link above and go back to the contentStyle.css implementation, or raise a PR if you have a better way to improve it.
 */

createRoot(rootIntoShadow).render(<App />);
