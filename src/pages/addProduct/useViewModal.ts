import { useState } from "react";
import { ToastMessage } from "../../enums/toast";
import toast from "react-hot-toast";
import { ProductsRepo } from "../../repositories/products";

const useAddProductViewModal = () => {
  const [data, setData] = useState({
    name: "",
    price: 0,
    description: "",
    category: "",
    discount: 0,
    ingredients: "",
    image: "",
  });
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const addProduct = async () => {
    if (data.discount > 100) {
      return toast.error(ToastMessage.discountLimit);
    }
    try {
      const response = await ProductsRepo.addProduct(data);
      if (response.success) {
        toast.success(ToastMessage.ProductAdded);
        setData(() => ({
          name: "",
          price: 0,
          description: "",
          category: "",
          discount: 0,
          ingredients: "",
          image: "",
        }));
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return { handleInputChange, data, addProduct };
};

export default useAddProductViewModal;
