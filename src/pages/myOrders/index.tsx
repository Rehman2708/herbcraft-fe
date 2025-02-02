import { useEffect, useState } from "react";
import Header from "../../components/header";
import "./style.scss";
import { OrdersRepo } from "../../repositories/orders";
import { useAuthViewModal } from "../auth/authViewModal";
import toast from "react-hot-toast";
import { IOrders } from "../../utils/types/orders";
import { calculateDeliveryDate } from "../../utils/common";
import { LoaderEmptyState } from "../../components/loaderEmptyScreen";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../enums/routes";
const MyOrders = () => {
  const [orders, setOrders] = useState<IOrders[] | []>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthViewModal();
  const navigate = useNavigate();
  const getOrders = async () => {
    setLoading(true);
    try {
      const response = await OrdersRepo.getOrders(user._id);
      if (response.success) {
        setOrders(response.data);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getOrders();
  }, []);
  return (
    <div>
      <Header />
      {loading || orders.length === 0 ? (
        <LoaderEmptyState
          loading={loading}
          length={orders.length}
          text="No orders found!"
        />
      ) : (
        <>
          {orders.map((item, index) => {
            return (
              <div
                key={index}
                className="ordersCard pointer gap"
                onClick={() =>
                  navigate(`${ROUTES.OrderDetails}?id=${item._id}`)
                }
              >
                <img
                  className="orderImage"
                  src={item.products[0].product.image}
                  alt=""
                />
                <div className="fullWidth">
                  <div className="center spaceBetween">
                    <h3 className="productLength">{item.totalItems} Items</h3>
                    <p className="orderDate">
                      <span className="titleHead">Ordered on: </span>
                      {calculateDeliveryDate(item.createdAt, true)}
                    </p>
                  </div>
                  <p className="deliveryDate">
                    <span className="titleHead">Delivery before: </span>
                    {calculateDeliveryDate(item.createdAt)}, 20:00
                  </p>
                  <p className="addressText">
                    <span className="titleHead">Deliver to:</span>
                    <span>{item.address}</span>
                  </p>
                  <p className="priceText">
                    <span className="titleHead">Payment: </span>₹
                    {item.totalPrice} paid by {item.paymentType}
                  </p>
                  <div className="center spaceBetween">
                    <p className="statusText">{item.status}</p>
                    <p className="orderId">{item._id}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default MyOrders;
