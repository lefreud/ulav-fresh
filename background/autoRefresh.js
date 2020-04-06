// Start a timer to refresh all Mon Portail tabs
chrome.alarms.create("refreshTabs", {
    "periodInMinutes": 50
});

/**
 * Questionnaire examples:
 * https://sitescours.monportail.ulaval.ca/ena/site/executionquestionnaire?idQuestionnaire=276048&idSite=113578
 * https://sitescours.monportail.ulaval.ca/ena/site/executionquestionnaire?useParamSession=false&idQuestionnaire=293054&idSite=112727&modeRepondre=true
 *
 * PDF examples:
 * https://sitescours.monportail.ulaval.ca/contenu/sitescours/036/03606/202001/site111803/modules704683/module908888/page2464237/bloccontenu2302541/2020%20GEL-1001%20-%20Technique%20I.pdf?identifiant=726e70df12a3eea165491ff21c6658b9e042001a
 *
 * @type {RegExp[]}
 */
const BLACKLISTED_URL_FORMATS = [
    /^http[s]?:\/\/sitescours\.monportail\.ulaval\.ca\/ena\/site\/executionquestionnaire.*$/,
    /^http[s]?:\/\/.*\.ulaval\.ca\/.*\.pdf.*$/i
]

// Refresh timer listener
chrome.alarms.onAlarm.addListener((alarm) => {

    chrome.tabs.query({
        url: ["https://*.monportail.ulaval.ca/*", "https://monportail.ulaval.ca/*"]
    }, (tabs) => {
        tabs.forEach((tab) => {
            let blacklistedUrl = false;
            for (let i = 0; i < BLACKLISTED_URL_FORMATS.length; i++) {
                if (tab.url.match(BLACKLISTED_URL_FORMATS[i])) {
                    blacklistedUrl = true;
                    break;
                }
            }
            if (!blacklistedUrl) {
                chrome.tabs.executeScript(tab.id, {
                    code: "location.reload();",
                    // code: "localStorage.setItem('mpo.securite.derniereAction',Date.now().toString());" +
                    //     "fetch(\"https://api.ulaval.ca/ul/auth/oauth/v2/refreshsession\", {\n" +
                    //     "    method: \"GET\",\n" +
                    //     "    credentials: \"include\"\n" +
                    //     "});"
                });
            }
        });
    })

});
