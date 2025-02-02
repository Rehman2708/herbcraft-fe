import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ProductsRepo } from "../../repositories/products";
import { IProduct } from "../../utils/types/products";

const useHomeViewModal = () => {
  const [products, setProducts] = useState<IProduct[] | []>([]);
  const [allProducts, setAllProducts] = useState<IProduct[] | []>([]);
  const [loading, setLoading] = useState(false);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const response = await ProductsRepo.getProducts();
      setProducts(response.data);
      setAllProducts(response.data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const filterProducts = (e: string) => {
    const fProd = allProducts.filter(
      (prod) =>
        prod.name.toLowerCase().includes(e.toLowerCase()) ||
        prod.category.toLowerCase().includes(e.toLowerCase()) ||
        prod.ingredients.toLowerCase().includes(e.toLowerCase())
    );
    setProducts(fProd);
  };

  return { products, loading, filterProducts };
};

export default useHomeViewModal;
