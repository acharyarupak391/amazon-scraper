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


## Database Schema

```sql
model Product {
  id                Int      @id @default(autoincrement())
  url               String   @default("")
  favicon           String   @default("")
  page_title        String   @default("")
  title             String   @default("")
  price             Float    @default(0.0)
  price_symbol      String   @default("")
  overview          String[] @default([])
  description       String[] @default([])
  main_images       String[] @default([])
  thumbnail_images  String[] @default([])
}
```

This is a Product model in Prisma, which represents a table in the database used for storing product data.

- `id`: This is the primary key for the Product table. It's an integer that auto-increments with each new record.
- `url`: This is a string field that stores the URL of the product.
- `favicon`: This is a string field that stores the favicon of the product's website.
- `page_title`: This is a string field that stores the title of the product's webpage.
- `title`: This is a string field that stores the title of the product.
- `price`: This is a float field that stores the price of the product.
- `price_symbol`: This is a string field that stores the currency symbol for the product's price.
- `overview`: This is an array of strings that stores an overview of the product. It's initialized as an empty array by default.
- `description`: This is an array of strings that stores a description of the product. It's initialized as an empty array by default.
- `main_images`: This is an array of strings that stores the URLs of the main images of the product. It's initialized as an empty array by default.
- `thumbnail_images`: This is an array of strings that stores the URLs of the thumbnail images of the product. It's initialized as an empty array by default.
