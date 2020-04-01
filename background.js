// When user clicks on extension icon, go to Mon Portail.
chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.create({'url': 'https://monportail.ulaval.ca'})
});


chrome.alarms.create("refreshTabs", {
    "periodInMinutes": 55
});

chrome.alarms.onAlarm.addListener((alarm) => {
    chrome.tabs.query({
        url: ["https://*.monportail.ulaval.ca/*", "https://monportail.ulaval.ca/*"]
    }, (tabs) => {
        tabs.forEach((tab) => {
            chrome.tabs.executeScript(tab.id, {
                code: "location.reload();",
            });
        });
    })
});
