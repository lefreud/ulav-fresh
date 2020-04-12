let darkThemeEnabled = false;

let settings = null;

chrome.storage.sync.get(['darkThemeEnabled'], (result) => {
    if (result.hasOwnProperty('darkThemeEnabled')) {
        darkThemeEnabled = result.darkThemeEnabled;
    }
});

chrome.webNavigation.onCommitted.addListener((details) => {
    chrome.tabs.sendMessage(details.tabId, {method: 'styleApply', darkThemeEnabled});
});

chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
    chrome.tabs.sendMessage(details.tabId, {method: 'styleApply', darkThemeEnabled});
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    sendResponse(darkThemeEnabled);
});

chrome.storage.onChanged.addListener((changes, areaName) => {
    if (changes.hasOwnProperty('darkThemeEnabled')) {
        darkThemeEnabled = changes.darkThemeEnabled.newValue;
        chrome.tabs.query({
            url: ["https://*.monportail.ulaval.ca/*", "https://monportail.ulaval.ca/*"]
        }, (tabs) => {
            tabs.forEach((tab) => {
                chrome.tabs.sendMessage(tab.id, {method: 'styleApply', darkThemeEnabled});
            });
        });
    }
});
