const sleep = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));

window.onload = async () => {

    let usernameInput = document.querySelector("input[type='text'][name='username']");
    let passwordInput = document.querySelector("input[type='password'][name='password']");
    let submitBtn = document.querySelector("button[type='submit']");
    let form = document.querySelector("form[method='POST']");

    chrome.storage.sync.get("loginCredentials", async (result) => {
        if (typeof result.loginCredentials === 'undefined') {
            form.onsubmit = (event) => {
                chrome.storage.sync.set({
                    loginCredentials: {
                        username: usernameInput.value,
                        password: passwordInput.value
                    }
                }, () => {
                    console.log('Saved', {
                        username: usernameInput.value,
                        password: passwordInput.value
                    });
                    form.submit();
                });
                return false;
            }
        } else {
            await sleep(100);
            usernameInput.value = result.loginCredentials.username;
            await sleep(100);
            passwordInput.value = result.loginCredentials.password;
            await sleep(100);
            submitBtn.click();
        }
    });
};
