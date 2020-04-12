document.addEventListener('DOMContentLoaded', function () {
    const checkbox = document.getElementById('dark-theme-checkbox');

    // Set current checkbox state
    chrome.storage.sync.get(['darkThemeEnabled'], (storage) => {
        if (storage.darkThemeEnabled === true) {
            checkbox.checked = true;
        }
    });

    checkbox.addEventListener('click',
            (event) => {
                chrome.storage.sync.set({darkThemeEnabled: checkbox.checked});
            }
        );
});
