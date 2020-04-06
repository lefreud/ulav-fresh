// When user clicks on extension icon, go to Mon Portail.
chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.create({'url': 'https://monportail.ulaval.ca'});
});

chrome.runtime.onInstalled.addListener(details => {
    chrome.contextMenus.create({
        id: "resetCredentials",
        title: "Réinitialiser mes données de connexion",
        contexts: ["browser_action"]
    });
});

chrome.contextMenus.onClicked.addListener(() => {
    chrome.storage.sync.remove("loginCredentials");
    alert("Votre IDUL et mot de passe ont été réinitialisés. Ils seront de nouveau sauvegardés lors de votre prochaine connexion.");
});
