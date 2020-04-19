document.addEventListener('DOMContentLoaded', function () {
    const darkThemeCheckbox = document.getElementById('dark-theme-checkbox');
    const automatedCheckbox = document.getElementById('automated-login-checkbox');

    // Set current checkboxes state
    chrome.storage.local.get(['darkThemeEnabled', 'automatedLoginEnabled'], (storage) => {
        if (storage.darkThemeEnabled === true) {
            darkThemeCheckbox.checked = true;
        }
        if (storage.automatedLoginEnabled === true) {
            automatedCheckbox.checked = true;
        }
    });

    darkThemeCheckbox.addEventListener('click', () => {
            chrome.storage.local.set({darkThemeEnabled: darkThemeCheckbox.checked});
        }
    );
    automatedCheckbox.addEventListener('click', () => {
            chrome.storage.local.set({automatedLoginEnabled: automatedCheckbox.checked});
            if (!automatedCheckbox.checked) {
                chrome.storage.local.remove('loginCredentials');
            }
        }
    );
});
