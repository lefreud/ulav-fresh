const DEFAULT_SETTINGS = {
    darkThemeEnabled: true,
    automatedLoginEnabled: true,
}

/**
 * Verifies settings that are not set in storage and initializes them to their default value.
 */
const setNewSettingsToDefaults = () => {
    let newSettings = {};
    chrome.storage.local.get(Object.keys(DEFAULT_SETTINGS), (storage) => {
        Object.keys(DEFAULT_SETTINGS).forEach((setting) => {
            if (!storage.hasOwnProperty(setting)) {
                newSettings[setting] = DEFAULT_SETTINGS[setting];
            }
        });
        chrome.storage.local.set(newSettings);
    });
}

chrome.runtime.onInstalled.addListener(setNewSettingsToDefaults);
