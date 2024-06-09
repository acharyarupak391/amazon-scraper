import React from 'react';
import {createRoot} from 'react-dom/client';
import './tailwind.css';

const App = () => {
  const [error, setError] = React.useState<string | null>(null);
  const [tab, setTab] = React.useState<chrome.tabs.Tab | null>(null);

  const isAmazonProductPage = React.useMemo(() => {
    if(!tab || !tab.url) return false;

    const url = new URL(tab.url);
    return url.hostname === 'www.amazon.in';
  }, [tab]);

  React.useEffect(() => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      setTab(tabs[0]);
    });
  }, []);

  const handleClick = () => {
    setError(null);

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      try {
        const tab = tabs[0];

        if(!tab || !tab.url || !tab.id) return setError('Please open an amazon.in product page');

        if(tab.status !== 'complete') return setError('Please wait for the page to load');

        const url = new URL(tab.url);
        if(url.hostname !== 'www.amazon.in') return setError('Please open an amazon.in product page');
        chrome.tabs.sendMessage(tab.id, {message: 'fetch_product_details', details: {
          url: tab.url,
          title: tab.title,
          favicon: tab.favIconUrl
        }}, (response) => {          
          // if(response.type === 'error') return setError(response.message);
          // setResponse(response.message);
        });
      } catch (error) {
        setError(error as string);
      }
    });
  }

  return (
    <main className='w-72 bg-gray-200 px-2 py-4'>
      {
        tab ? isAmazonProductPage ? (
          <div className=''>
            <div className='flex gap-2 items-start'>
              <div className='bg-white rounded-full p-1 overflow-hidden flex mt-1'>
                <img src={tab.favIconUrl} alt={tab.title}  width={32} height={32} />
              </div>
              <p className='text-base font-medium overflow-hidden text-ellipsis max-w-full line-clamp-2'>
                {tab.title}
              </p>
            </div>
            <p className='text-xs overflow-hidden font-mono text-ellipsis max-w-full line-clamp-3 break-all mt-1'>
              {tab.url}
            </p>

            <div className='mt-4'>
              <button onClick={handleClick} className='px-2 py-1 rounded-md bg-gray-300 hover:bg-gray-400'>Store product details</button>
              {error && <p>{error}</p>}
            </div>
          </div>
        ) : (
          <>
            <p className='text-base italic font-medium'>Please open an amazon.in product page</p>
            {error && <p className='mt-1 text-red-400'>{error}</p>}
          </>
        )
        : (
          <p className='text-base italic font-medium'>Loading...</p>
        )
      }

      <a target='_blank' className='underline mt-4 text-gray-600 text-sm block w-max italic' href="view.html">View Products</a>
    </main>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);

// chrome.action.onClicked.addListener((tab) => {
// });