# Amazon Scraper

This is a simple Amazon scraper that scrapes the product name, price, images, and product overview & description.


## Installation and Usage

- Clone the repository
  
### Server
- Run `cd server && yarn`
- Add your postgres database url in the environment variable as `DATABASE_URL` and run `yarn prisma db push` to create the database schema and push
- Then run `yarn start` to start the server

### Client
- Run `cd client && yarn`(from the root directory)
- If your server is running on a different port or host, then update all instance of `http://localhost:8080` from client side code to your server url
- Run `yarn build` to build the client side code

#### Load the extension in Chrome
- Go to `chrome://extensions/` and enable the developer mode
- Click on `Load unpacked` and select the `public` folder inside the client folder
- The extension will be loaded in the browser
- Visit any *Amazon.in* product page and click on the extension icon
  - Click on the `Save Product` button to store the product details in the database
  - Click on the `View Products` button to view the stored products

***Important: Make sure to disable other extensions and reload the page once the extension is added/reloaded. Due to existing extension, you might see errors like: `Unchecked runtime.lastError: The message port closed before a response was received.`***
