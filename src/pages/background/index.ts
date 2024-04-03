 import reloadOnUpdate from 'virtual:reload-on-update-in-background-script';
 import 'webextension-polyfill';

 reloadOnUpdate('pages/background');

// /**
//  * Extension reloading is necessary because the browser automatically caches the css.
//  * If you do not use the css of the content script, please delete it.
//  */
 reloadOnUpdate('pages/content/style.scss');

// console.log('background loaded');

chrome.runtime.onMessage.addListener(async function(message, sender, sendResponse) {
});

chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.get(activeInfo.tabId, (tab) => {
        console.log("tabActivated", tab);
        
    });
});

chrome.downloads.onDeterminingFilename.addListener(downloadItem => {
    chrome.runtime.sendMessage({type:"download", filename:downloadItem.filename, url:downloadItem.url});
})
