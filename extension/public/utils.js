function formatPriceToNumber(priceString) {
  return parseFloat(priceString.replace(",", ""));
}

function getProductTitle(centerCol) {
  try {
    const titleContainer = centerCol.querySelector("div#title_feature_div span#productTitle");
  
    return titleContainer.textContent.trim();
  } catch (error) {
    console.error("Error getting product name", error);
    return ""
  }
}

function getPriceDetails(centerCol) {
  try {
    const priceContainer = centerCol.querySelector("span.a-price");
    const price = priceContainer.querySelector("span.a-price-whole").textContent.trim();
    const priceSymbol = priceContainer.querySelector("span.a-price-symbol").textContent.trim();

    return {
      price: formatPriceToNumber(price),
      priceSymbol
    };
  } catch (error) {
    console.error("Error getting price details", error);
    return {
      price: 0,
      priceSymbol: ""
    };
  }
}

function getProductOverview(centerCol) {
  try {
    const overviewContainer = centerCol.querySelector("div#productOverview_feature_div");
    const tableRows = overviewContainer.querySelectorAll("table>tbody tr");

    const overview = []
    tableRows.forEach((row) => {
      const [key, val] = row.querySelectorAll("& > td");
      overview.push(`${key.textContent.trim()}: ${val.textContent.trim()}`)
    });

    return overview;
  } catch (error) {
    console.error("Error getting product overview", error);
    return "";
  }
}

function getProductDescription(centerCol) {
  const description = []
  try {
    const descriptionContainer = centerCol.querySelector("div#featurebullets_feature_div");
    const lists = descriptionContainer.querySelectorAll("ul li");

    if(lists.length > 0) {
      lists.forEach((list) => {
        description.push(`${list.textContent.trim()}`)
      });
  
      return description;
    }

    const productDetailsContainer = document.querySelector("div#productDetails_feature_div");
    const tableRows = productDetailsContainer.querySelectorAll("table[id*='productDetails'] tbody>tr");

    tableRows.forEach((row) => {
      const key = row.querySelector("th").textContent.trim();
      const val = row.querySelector("td").textContent.trim();

      description.push(`${key}: ${val}`)
    })

    return description;
  } catch (error) {
    console.error("Error getting product description", error);
    return "";
  }
}

function getProductImages(imageBlock) {
  const images = {
    main: [],
    thumbnails: []
  }

  try {
    const imageElements = imageBlock.querySelectorAll("ul.list > li.image.item div.imgTagWrapper img");
    const imageUrls = [];

    imageElements.forEach((image) => {
      imageUrls.push(image.src);
    })

    images.main = imageUrls;
  } catch (error) {
    console.error("Error getting main product images", error);
    images.main = [];
  }

  try {
    const thumbnails = imageBlock.querySelectorAll("ul.a-button-list li.item.imageThumbnail img");
    const thumbnailUrls = [];

    thumbnails.forEach((thumbnail) => {
      thumbnailUrls.push(thumbnail.src);
    })

    images.thumbnails = thumbnailUrls;
  } catch (error) {
    console.error("Error getting thumbnail images", error);
    images.thumbnails = [];
  }

  return images;
}