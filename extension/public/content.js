function fetchProductDetails(url, title, favicon) {
  const centerCol = document.querySelector("div#centerCol")
  const imageBlock = document.querySelector("div#imageBlock_feature_div");

  if(!centerCol || !imageBlock) {
    console.error("Center column not found. Probably not a product page", {
      title,
      url,
      favicon
    });
    return;
  }

  const productTitle = getProductTitle(centerCol);

  const {price, priceSymbol} = getPriceDetails(centerCol);

  const overview = getProductOverview(centerCol);

  const description = getProductDescription(centerCol);

  const images = getProductImages(imageBlock);

  const details = {
    url: url,
    favicon: favicon,
    page_title: title,
    title: productTitle,
    price,
    price_symbol: priceSymbol,
    overview,
    description,
    main_images: images.main,
    thumbnail_images: images.thumbnails
  };
  sendProductDetailsToBackground(details);
}

function sendProductDetailsToBackground(details) {
  console.log("sendProductDetailsToBackground", details);
  // send message to background.js where the server request is made
  chrome.runtime.sendMessage({ message: "send_product_details", details }, response => {
    // console.log("product_details_send from content to background", response);
    console.log("response from background to content", response);
  });
}

// listen for messages from the popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === 'fetch_product_details') {
    console.log("fetch_product_details from popup to content", request);
    const details = request.details;
    fetchProductDetails(details.url, details.title, details.favicon);
  }
});