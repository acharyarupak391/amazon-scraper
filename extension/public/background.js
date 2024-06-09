const SERVER_URL = "http://localhost:8080";

chrome.runtime.onMessage.addListener(async(request, sender, sendResponse) => {
  if (request.message === "send_product_details") {
    console.log("send_product_details from content to background", request)

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