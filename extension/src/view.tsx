import React from "react";
import { createRoot } from "react-dom/client";
import useFetchProducts from "./useFetchProducts";
import "./tailwind.css";
import { classnames, formatCurrency } from "./util";

const View = () => {
  const { products, loading, error } = useFetchProducts();

  return (
    <main className="max-w-screen-xl p-4 pt-8 mx-auto">
      <h1 className="px-4 text-3xl md:px-6">View Products</h1>

      <section className={classnames(
          "grid gap-6 p-4 mt-5 md:p-6",
          products.length > 0 ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4" : "grid-cols-1"
        )}>
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="overflow-hidden bg-white rounded-lg shadow-lg"
            >
              <div className="relative">
                <img
                  src={product.main_images[0]}
                  alt={product.title}
                  width={400}
                  height={300}
                  className="object-contain w-full h-60"
                />
                <div className="grid grid-cols-5 gap-1 p-2">
                  {product.thumbnail_images
                    .slice(0, 5)
                    .map((thumbnail, index) => (
                      <img
                        key={index}
                        src={thumbnail}
                        alt={`Thumbnail ${index + 1}`}
                        width={80}
                        height={60}
                        className="object-cover rounded-md"
                      />
                    ))}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold md:text-xl line-clamp-2">
                  {product.title}
                </h3>
                <h4 className="text-base font-semibold text-gray-700 md:text-lg">
                  {formatCurrency(product.price)}
                </h4>

                <div>
                  <h3 className="mt-2 mb-1 text-lg font-semibold text-gray-800">
                    Overview
                  </h3>
                  {product.overview.map((ov, index) => (
                    <p className="text-sm text-gray-400" key={`ov-${index}`}>
                      {ov}
                    </p>
                  ))}
                </div>

                <div className="relative flex items-end justify-between mt-2">
                  <button className="text-sm text-gray-500 border-b border-gray-400 border-dashed peer">
                    Hover to see description
                  </button>

                  {product.description && (
                    <div className={classnames(
                      "absolute opacity-0 hidden max-w-80 bg-gray-50 p-2 flex-col gap-2 shadow-2xl border border-dashed border-gray-500 rounded-md bottom-0 left-0 transform transition-all",
                      "peer-hover:opacity-100 peer-hover:bottom-5 peer-hover:flex",
                      "peer-focus:opacity-100 peer-focus:bottom-5 peer-focus:flex",
                      "hover:opacity-100 hover:bottom-5 hover:flex",
                    )}>
                      <h3 className="mb-2 text-lg font-semibold text-gray-800">Description</h3>

                      {product.description.map((desc, index) => (
                        <p
                          className="text-sm text-gray-500"
                          key={`desc-${index}`}
                        >
                          {desc}
                        </p>
                      ))}
                    </div>
                  )}

                  <a
                    className="flex items-center gap-2 px-2 py-1 bg-gray-100 rounded-full w-max"
                    href={product.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="text-xs font-medium text-gray-600">
                      Go to product page
                    </span>
                    <img
                      src={product.favicon}
                      width={20}
                      height={20}
                      className="p-1 bg-gray-300 rounded-full"
                    />
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className={classnames(
            "w-full p-4 font-mono text-lg italic font-medium text-center border border-dashed rounded-sm",
            !error ? "bg-slate-100 text-slate-800 border-slate-800": "bg-red-100 text-red-800 border-red-800"
          )}>
            {error ? error : loading ? "Loading..." : "No products found"}
          </p>
        )}
      </section>
    </main>
  );
};

const root = createRoot(document.getElementById("root")!);
root.render(<View />);
