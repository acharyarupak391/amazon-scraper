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
  
  return details
}

function sendProductDetailsToBackground(details) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ message: "update_product_details", details }, response => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(response);
      }
    });
  });
}

// listen for messages from the popup
chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
  if (request.message === 'fetch_product_details') {
    const details = request.details;
    const productDetails = fetchProductDetails(details.url, details.title, details.favicon);
    
    if(productDetails) {
      try {
        const response = await sendProductDetailsToBackground(productDetails);
        sendResponse({success: response || "Product details updated successfully"});
      } catch (error) {
        sendResponse({error: error.message || "Product details not found"});
      }
    } else {
      sendResponse({error: "Product details not found"});
    }
  }
});