import { createRoot } from 'react-dom/client';
import App from '@pages/content/ui/app';
import refreshOnUpdate from 'virtual:reload-on-update-in-view';
import injectedStyle from './injected.css?inline';
import { callAPI } from './api';
import store from '@root/src/store/store';

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
let curPageHeadings = [];

function scrapeData() {
    const paragraphs = document.querySelectorAll('[role="heading"]');
    const data = Array.from(paragraphs).map(p => p.textContent);
    curPageHeadings = data;
    chrome.runtime.sendMessage(data);
    return data;
}


// Send scraped data back to the extension
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    
    if (message === 'scrapeData') {
        const scrapedData = scrapeData();
    }

    else if(message == "fillOut") {
      let i = 1;
      const inputs = document.querySelectorAll('input');
      inputs.forEach((input) => {
          if(input.type != "hidden")
            input.value = "Answer about:" + curPageHeadings[i ++];
      })

      const textareas = document.querySelectorAll('textarea');
      textareas.forEach(input => {
          input.value = "Answer about:" + curPageHeadings[i ++];
      })

      const inputDivs = document.getElementsByClassName("Xb9hP");
      Array.from(inputDivs).forEach(div => {
        div.children[1].style.display = "none";
      })

      const textDivs = document.getElementsByClassName("RpC4Ne oJeWuf");
      Array.from(textDivs).forEach(div => {
        div.children[0].style.display = "none";
      })
    }
}); 

/**
 * https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite/pull/174
 *
 * In the firefox environment, the adoptedStyleSheets bug may prevent contentStyle from being applied properly.
 * Please refer to the PR link above and go back to the contentStyle.css implementation, or raise a PR if you have a better way to improve it.
 */

createRoot(rootIntoShadow).render(<App />);
