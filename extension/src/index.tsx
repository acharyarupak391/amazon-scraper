import React from "react";
import { createRoot } from "react-dom/client";
import "./tailwind.css";
import { classnames } from "./util";

const App = () => {
  const [error, setError] = React.useState<string | null>(null);
  const [tab, setTab] = React.useState<chrome.tabs.Tab | null>(null);

  const [saved, setSaved] = React.useState<boolean>(false);

  const isAmazonProductPage = React.useMemo(() => {
    if (!tab || !tab.url) return false;

    const url = new URL(tab.url);
    return url.hostname === "www.amazon.in";
  }, [tab]);

  React.useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      setTab(tabs[0]);
    });
  }, []);

  const handleClick = () => {
    setError(null);

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      try {
        const tab = tabs[0];

        if (!tab || !tab.url || !tab.id)
          return setError("Please open an amazon.in product page");

        if (tab.status !== "complete")
          return setError("Please wait for the page to load");

        const url = new URL(tab.url);
        if (url.hostname !== "www.amazon.in")
          return setError("Please open an amazon.in product page");
        chrome.tabs.sendMessage(
          tab.id,
          {
            message: "fetch_product_details",
            details: {
              url: tab.url,
              title: tab.title,
              favicon: tab.favIconUrl,
            },
          },
          () => {
            setSaved(true);
          }
        );
      } catch (error) {
        setError(error as string);
      }
    });
  };

  return (
    <main className="px-2 py-4 bg-gray-200 w-72">
      {tab ? (
        isAmazonProductPage ? (
          <div className="">
            <div className="flex items-start gap-2">
              <div className="flex flex-shrink-0 p-1 mt-1 overflow-hidden bg-white rounded-full">
                <img
                  src={tab.favIconUrl}
                  alt={tab.title}
                  width={24}
                  height={24}
                />
              </div>
              <p className="max-w-full overflow-hidden text-base font-medium text-ellipsis line-clamp-2">
                {tab.title}
              </p>
            </div>
            <p className="max-w-full mt-1 overflow-hidden font-mono text-xs break-all text-ellipsis line-clamp-3">
              {tab.url}
            </p>

            <div className="mt-4">
              <button
                onClick={handleClick}
                disabled={saved}
                className={classnames(
                  "px-2 py-1 bg-gray-300 rounded-md ",
                  !saved && "hover:bg-gray-400"
                )}
              >
                {saved ? "✅ Product saved to database" : "Save Product"}
              </button>
              {error && <p>{error}</p>}
            </div>
          </div>
        ) : (
          <>
            <p className="text-base italic font-medium">
              Please open an amazon.in product page
            </p>
            {error && <p className="mt-1 text-red-400">{error}</p>}
          </>
        )
      ) : (
        <p className="text-base italic font-medium">Loading...</p>
      )}

      <a
        target="_blank"
        className="block mt-4 text-sm italic text-gray-600 underline w-max"
        href="view.html"
      >
        View Products
      </a>
    </main>
  );
};

const root = createRoot(document.getElementById("root")!);
root.render(<App />);

// chrome.action.onClicked.addListener((tab) => {
// });
