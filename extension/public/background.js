const SERVER_URL = "http://localhost:8080";

chrome.runtime.onMessage.addListener(async(request, _, sendResponse) => {
  if (request.message === "update_product_details") {

    const details = request.details;
    
    try {
      const response = await fetch(`${SERVER_URL}/product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(details)
      });

      await response.json();
      sendResponse({ message: "sent_product_details", status: "success"});
    } catch (error) {
      console.error("Error sending product details to server", error);
      sendResponse({ message: "sent_product_details", status: "error"});
    }
  }

  return true;
})