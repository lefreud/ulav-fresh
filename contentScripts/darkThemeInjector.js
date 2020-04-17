let darkThemeStyle = require('../injectedStyles/dark-theme.scss').toString();
const DARK_THEME_STYLESHEET_ID = "ulav-fresh-dark-theme";

/**
 * Disables the style element containing the dark theme.
 * Does nothing if the element already exists.
 */
const disableDarkTheme = () => {
    let styleElement = document.getElementById(DARK_THEME_STYLESHEET_ID);
    if (styleElement) {
        styleElement.parentNode.removeChild(styleElement);
    }
};

/**
 * Adds a style element do the <html> element. The style element contains the dark theme CSS rules.
 * Does nothing if the element already exists.
 */
const enableDarkTheme = () => {
    if (!document.getElementById(DARK_THEME_STYLESHEET_ID)) {
        const styleElement = document.createElement("style");
        // styleElement.rel= "stylesheet";
        // styleElement.href = chrome.extension.getURL("injectedStyles/dark-theme.css");
        styleElement.id = "ulav-fresh-dark-theme";
        styleElement.innerHTML = darkThemeStyle;
        document.documentElement.appendChild(styleElement);
    }
};

const applyStyle = (darkThemeEnabled) => {
    if (darkThemeEnabled) {
        enableDarkTheme();
    } else {
        disableDarkTheme();
    }
};

chrome.runtime.sendMessage({method: 'getDarkThemeStyle'}, applyStyle);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.method === "styleApply") {
        applyStyle(request.darkThemeEnabled);
    }
});
