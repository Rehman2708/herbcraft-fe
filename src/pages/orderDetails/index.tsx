import { useSearchParams } from "react-router-dom";
import Header from "../../components/header";
import { useEffect, useState } from "react";
import { OrdersRepo } from "../../repositories/orders";
import toast from "react-hot-toast";
import { IOrders } from "../../utils/types/orders";
import "./style.scss";
import { calculateDeliveryDate } from "../../utils/common";
import LogoText from "../../components/logo";
import { LoaderEmptyState } from "../../components/loaderEmptyScreen";
import SingleProduct from "../../components/singleProduct";

const OrderDetails = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [order, setOrder] = useState<IOrders | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const getOrderDetails = async () => {
    setLoading(true);
    try {
      if (id) {
        const response = await OrdersRepo.getOrderDetails(id);
        if (response.success) {
          setOrder(response.data);
        }
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getOrderDetails();
  }, [id]);
  return (
    <div>
      <Header />
      {loading || !order ? (
        <LoaderEmptyState loading={loading} length={1} />
      ) : (
        <div className="center cartContainer">
          <div className="cartLeftContainer">
            {order?.products.map((product, index) => (
              <div key={index}>
                <SingleProduct
                  product={product.product}
                  cart
                  cartQuantity={product.quantity}
                  hideButtons
                  isDetail
                />
              </div>
            ))}
          </div>
          <div className="cartRightContainer">
            <div className="cardRightWrapper">
              <h3 className="priceHeading">Order Details</h3>
              <div className="center spaceBetween priceRow">
                <p>Delivery by</p>
                <h2>{calculateDeliveryDate(order?.createdAt)}</h2>
              </div>
              <div className="priceRow">
                <p>{order?.address}</p>
                {order?.phoneNumber && <p>+91 {order.phoneNumber}</p>}
              </div>
              <div className="center spaceBetween priceRow">
                <p>Total items </p>
                <p>{order?.totalItems} Items</p>
              </div>
              <div className="center spaceBetween priceRow">
                <p>Status</p>
                <span className="pendingText">{order?.status}</span>
              </div>
              <div className="center spaceBetween priceRow totalAmountRow">
                <h3>Total Amount</h3>
                <h3>₹{order?.totalPrice}</h3>
              </div>
              <h4 className="priceRow savingText">
                Payment done by {order?.paymentType}
              </h4>
            </div>
            <div className="center safePaymentContainer smallGap">
              <LogoText size={40} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
