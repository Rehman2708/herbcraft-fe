import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../components/header";
import { useEffect, useState } from "react";
import { IProduct } from "../../utils/types/products";
import { ProductsRepo } from "../../repositories/products";
import toast from "react-hot-toast";
import { LoaderEmptyState } from "../../components/loaderEmptyScreen";
import "./style.scss";
import { BsLightningCharge } from "react-icons/bs";
import { MdOutlineShoppingCart } from "react-icons/md";
import { ROUTES } from "../../enums/routes";
import useCartViewModal from "../cart/useViewModal";
import { AiOutlineDelete } from "react-icons/ai";
import { useAuthViewModal } from "../auth/authViewModal";

const ProductDetail = () => {
  const { user } = useAuthViewModal();

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();
  const getProductDetails = async () => {
    setLoading(true);
    try {
      const response = await ProductsRepo.getProducts(id!);
      if (response.success) {
        setProduct(response.data);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteProduct = async () => {
    try {
      if (product) {
        const response = await ProductsRepo.deleteProduct(product?._id);
        if (response.success) {
          toast.success("Product deleted successfully!");
          navigate(-1);
        }
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    if (id) {
      getProductDetails();
    }
  }, [id]);
  const { addToCart } = useCartViewModal();
  return (
    <div className="productDetailContainer">
      <Header />
      {loading ? (
        <LoaderEmptyState loading={loading} length={1} />
      ) : (
        <div className="productDetailWrapper gap">
          <div className="productDetailLeft">
            <img src={product?.image} alt="Product" className="productImage" />
            <div className="buttonGroup center gap">
              {added ? (
                <button
                  className="successButton"
                  onClick={() => navigate(ROUTES.Cart)}
                >
                  <MdOutlineShoppingCart />
                  View cart
                </button>
              ) : (
                <button
                  className="successButton"
                  onClick={async () => {
                    if (product?._id) {
                      await addToCart(product?._id, 1);
                      setAdded(true);
                    }
                  }}
                >
                  <MdOutlineShoppingCart />
                  Add to cart
                </button>
              )}
              <button
                className="successButton secondaryButton"
                onClick={() =>
                  navigate(ROUTES.Checkout, {
                    state: {
                      totalPrice: product?.discountedPrice,
                      products: { product: product?._id, quantity: 1 },
                      totalItems: 1,
                    },
                  })
                }
              >
                <BsLightningCharge />
                Buy now
              </button>
              {user.isAdmin && (
                <div
                  className="deleteProduct center pointer"
                  onClick={handleDeleteProduct}
                >
                  <AiOutlineDelete />
                </div>
              )}
            </div>
          </div>
          <div className="productDetailText">
            <p className="pageRoute pointer" onClick={() => navigate(-1)}>
              Home {">"} {product?.name}
            </p>
            <p className="productName">{product?.name}</p>
            <p className="productCategory">{product?.category}</p>
            <p className="productIngredients">
              <span className="pageRoute">Ingredients:</span>{" "}
              {product?.ingredients}
            </p>
            <p className="center smallGap justifyStart productPrice">
              ₹{product?.discount ? product?.discountedPrice : product?.price}
              <p className="productMRP">₹{product?.price}</p>
              <p className="productDiscount">
                {product?.discount ? ` ${product.discount}% off` : ""}
              </p>
            </p>
            <p className="productDescription">{product?.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
