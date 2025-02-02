import Header from "../../components/header";
import useCartViewModal from "./useViewModal";
import "../home/style.scss";
import "./style.scss";
import { LoaderEmptyState } from "../../components/loaderEmptyScreen";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { MdCheckCircle } from "react-icons/md";
import { ROUTES } from "../../enums/routes";
import SingleProduct from "../../components/singleProduct";

const Cart = () => {
  const {
    products,
    loading,
    totalItems,
    discountedAmount,
    undiscountedTotalPrice,
    cartProd,
    navigate,
    finalAmount,
  } = useCartViewModal();

  return (
    <div>
      <Header />
      <>
        {products.length < 1 || loading ? (
          <LoaderEmptyState
            loading={loading}
            length={Number(products.length)}
            text="No product added to cart"
          />
        ) : (
          <div className="center cartContainer">
            <div className="cartLeftContainer">
              {products.map((product, index) => (
                <div key={index}>
                  <SingleProduct
                    product={product.productId}
                    cart
                    cartQuantity={product.quantity}
                  />
                </div>
              ))}
            </div>
            <div className="cartRightContainer">
              <div className="cardRightWrapper">
                <h3 className="priceHeading">Price Details</h3>
                <div className="center spaceBetween priceRow">
                  <p>Price ({totalItems} Items)</p>
                  <p>₹{undiscountedTotalPrice.toFixed(2)}</p>
                </div>
                <div className="center spaceBetween priceRow">
                  <p>Discount</p>
                  <p>- ₹{discountedAmount.toFixed(2)}</p>
                </div>
                <div className="center spaceBetween priceRow">
                  <p>Delivery Charges</p>
                  <p>
                    <span className="overLineText">₹40</span>{" "}
                    <span className="savingText">Free</span>
                  </p>
                </div>
                <div className="center spaceBetween priceRow totalAmountRow">
                  <h3>Total Amount</h3>
                  <h3>₹{finalAmount.toFixed(2)}</h3>
                </div>
                <h4 className="priceRow savingText">
                  You will save ₹{discountedAmount.toFixed(2)} on this order
                </h4>
              </div>
              <button
                className="successButton orderButton"
                onClick={() =>
                  navigate(ROUTES.Checkout, {
                    state: {
                      totalPrice: finalAmount.toFixed(2),
                      products: cartProd,
                      totalItems: totalItems,
                    },
                  })
                }
              >
                <MdCheckCircle />
                PLACE ORDER
              </button>
              <div className="center safePaymentContainer smallGap">
                <h2>
                  <IoShieldCheckmarkOutline />
                </h2>
                <h5 className="safePaymentText">
                  Safe and Secure Payments.Easy returns.100% Authentic products.
                </h5>
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default Cart;
