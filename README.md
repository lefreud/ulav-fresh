# uLav FRESH

uLav FRESH is a Chrome extension that improves our Université Laval's web portal user experience.

## Downloading the Chrome extension

https://chrome.google.com/webstore/detail/ulav-fresh/gmiiclkenjbpedgpnofpacmjfijiajbf

## Building and running the extension from source

Clone this repository.

````shell script
git clone https://github.com/lefreud/ulav-fresh
````

Build the Javascript source code with webpack.

````
npm run build
````

This will create a `dist` folder containing the built extension.

You must then go to `chrome://extensions`, toggle _Developer mode_ on and click on _Load unpacked_. Then, select the `dist` folder.
