// Start a timer to refresh all Mon Portail tabs
chrome.alarms.create("refreshTabs", {
    "periodInMinutes": 55
});

// Refresh timer listener
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
