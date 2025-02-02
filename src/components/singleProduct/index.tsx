import { useState } from "react";
import "./style.scss";
import {
  MdOutlineCheck,
  MdOutlineRemoveShoppingCart,
  MdOutlineShoppingCart,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { IProduct } from "../../utils/types/products";
import useCartViewModal from "../../pages/cart/useViewModal";
import useProductStore from "../../store/products";
import { ROUTES } from "../../enums/routes";

const SingleProduct = ({
  product,
  cart,
  cartQuantity,
  hideButtons,
}: {
  product: IProduct;
  cart?: boolean;
  cartQuantity?: number;
  hideButtons?: boolean;
}) => {
  const { addToCart, removeFromCart, updateCartProduct } = useCartViewModal();
  const [quantity, setQuantity] = useState(1);
  const [addedCartQuantity, setAddedCartQuantity] = useState(cartQuantity);
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();
  const { getProducts } = useProductStore();
  const handleAddToCart = () => {
    setAdded(true);
    setQuantity(1);
    addToCart(product._id, quantity);
    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  return (
    <div
      className={`singleCard pointer ${cart && "cartCard"}`}
      onClick={() => navigate(`${ROUTES.ProductDetail}?id=${product._id}`)}
    >
      <img
        src={product.image}
        alt=""
        className={hideButtons ? "noButProdImg" : "prodImage"}
      />
      <div>
        <p className="productName">{product?.name}</p>
        <p className="productCategory">{product?.category}</p>
        <p className="center smallGap justifyStart productPrice">
          ₹{product?.discount ? product.discountedPrice : product?.price}
          <p className="productMRP">₹{product?.price}</p>
          <p className="productDiscount">
            {product?.discount ? ` ${product.discount}% off` : ""}
          </p>
        </p>
        {cart && (
          <>
            <div className="center justifyStart smallGap cartQuantity">
              Quantity:
              <button
                disabled={addedCartQuantity === 1}
                onClick={(e) => {
                  e.stopPropagation();
                  if (addedCartQuantity) {
                    setAddedCartQuantity(addedCartQuantity - 1);
                    updateCartProduct(product._id, addedCartQuantity - 1);
                  }
                }}
                className="secondaryButton center pointer"
              >
                <AiOutlineMinus />
              </button>
              {addedCartQuantity}
              <button
                disabled={addedCartQuantity === 10}
                onClick={(e) => {
                  e.stopPropagation();
                  if (addedCartQuantity) {
                    setAddedCartQuantity(addedCartQuantity + 1);
                    updateCartProduct(product._id, addedCartQuantity + 1);
                  }
                }}
                className="secondaryButton center pointer"
              >
                <AiOutlinePlus />
              </button>
            </div>
          </>
        )}
        {!hideButtons && (
          <>
            {cart ? (
              <div className="center gap">
                <button
                  className="successButton errorButton"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromCart(product._id);
                    getProducts();
                  }}
                >
                  <MdOutlineRemoveShoppingCart />
                  Remove from cart
                </button>
              </div>
            ) : (
              <div className="center smallGap">
                <div className="center smallGap">
                  <button
                    disabled={quantity === 1}
                    onClick={(e) => {
                      e.stopPropagation();
                      setQuantity((prev) => prev - 1);
                    }}
                    className="secondaryButton center pointer"
                  >
                    <AiOutlineMinus />
                  </button>
                  <h4>{quantity}</h4>
                  <button
                    disabled={quantity === 10}
                    onClick={(e) => {
                      e.stopPropagation();
                      setQuantity((prev) => prev + 1);
                    }}
                    className="secondaryButton center pointer"
                  >
                    <AiOutlinePlus />
                  </button>
                </div>
                <button
                  disabled={added}
                  className="successButton"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart();
                  }}
                >
                  {added ? (
                    <>
                      <MdOutlineCheck />
                      Added
                    </>
                  ) : (
                    <>
                      <MdOutlineShoppingCart />
                      Add to cart
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SingleProduct;
