const INPUT_DELAY = 80;

const sleep = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));

window.onload = async () => {
    let usernameInput = document.querySelector("input[type='text'][name='username']");
    let passwordInput = document.querySelector("input[type='password'][name='password']");
    let submitBtn = document.querySelector("button[type='submit']");
    let form = document.querySelector("form[method='POST']");

    chrome.storage.local.get(["loginCredentials", "automatedLoginEnabled"], async (result) => {
        if (result.hasOwnProperty('automatedLoginEnabled') && result.automatedLoginEnabled === true) {
            if (typeof result.loginCredentials === 'undefined') {
                form.onsubmit = (event) => {
                    chrome.storage.local.set({
                        loginCredentials: {
                            username: usernameInput.value,
                            password: passwordInput.value
                        }
                    }, () => {
                        form.submit();
                    });
                    return false;
                }
            } else {
                await sleep(INPUT_DELAY);
                usernameInput.value = result.loginCredentials.username;
                await sleep(INPUT_DELAY);
                passwordInput.value = result.loginCredentials.password;
                await sleep(INPUT_DELAY);
                submitBtn.click();
            }
        }
    });
};
