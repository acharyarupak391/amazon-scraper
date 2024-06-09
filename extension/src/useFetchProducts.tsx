import { useEffect, useState } from "react";

interface Product {
  id: number;
  url: string;
  favicon: string;
  page_title: string;
  title: string;
  price: number;
  price_symbol: string;
  overview: string[];
  description: string[];
  main_images: string[];
  thumbnail_images: string[];
}

const useFetchProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const url = 'http://localhost:8080'
    fetch(`${url}/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.toString() as string);
        setLoading(false);
      });
  }, []);

  return { products, loading, error };
}

export default useFetchProducts;