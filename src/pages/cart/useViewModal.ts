import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IProduct } from "../../utils/types/products";
import { CartRepo } from "../../repositories/cart";
import { useAuthViewModal } from "../auth/authViewModal";
import { ToastMessage } from "../../enums/toast";
import useProductStore from "../../store/products";
import { useNavigate } from "react-router-dom";
interface CartProduct {
  quantity: number;
  productId: IProduct;
}
const useCartViewModal = () => {
  const [products, setProducts] = useState<CartProduct[] | []>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuthViewModal();
  const { gettingProducts, getProducts } = useProductStore();
  const getCartProducts = async () => {
    setLoading(true);
    try {
      const response = await CartRepo.getCartProducts(user._id);
      if (response.success) {
        setProducts(response.data);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId: string, quantity: number) => {
    try {
      setLoading(true);
      const response = await CartRepo.addProductInCart(
        user._id,
        productId,
        quantity
      );
      if (response.success) {
        toast.success(ToastMessage.addedToCart);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const updateCartProduct = async (productId: string, quantity: number) => {
    try {
      const response = await CartRepo.updateProductInCart(
        user._id,
        productId,
        quantity
      );
      if (response.success) {
        getProducts();
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  const removeFromCart = async (productId: string) => {
    try {
      setLoading(true);
      const response = await CartRepo.deleteProductFromCart(
        user._id,
        productId
      );
      if (response.success) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.productId._id !== productId)
        );
        toast.success(ToastMessage.removedFromCart);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const cartProd = products.map((item) => ({
    product: item?.productId?._id,
    quantity: item?.quantity,
  }));
  // Calculate price details
  const totalItems = products.reduce((sum, item) => sum + item.quantity, 0);
  const undiscountedTotalPrice = products.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );
  const finalAmount = products.reduce(
    (sum, item) => sum + item.productId.discountedPrice * item.quantity,
    0
  );

  const discountedAmount = undiscountedTotalPrice - finalAmount;
  const navigate = useNavigate();
  useEffect(() => {
    getCartProducts();
  }, [gettingProducts]);
  return {
    products,
    loading,
    addToCart,
    updateCartProduct,
    removeFromCart,
    getCartProducts,
    totalItems,
    discountedAmount,
    undiscountedTotalPrice,
    cartProd,
    navigate,
    finalAmount,
  };
};

export default useCartViewModal;
