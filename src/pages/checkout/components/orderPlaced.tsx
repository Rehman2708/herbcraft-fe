import { useNavigate } from "react-router-dom";
import successGif from "../../../assets/images/success.json";
import Lottie from "react-lottie";
import { ROUTES } from "../../../enums/routes";
const OrderPlaced = () => {
  const navigate = useNavigate();
  return (
    <div className="successContainer">
      <Lottie
        options={{ animationData: successGif }}
        height={400}
        width={400}
      />
      <h1 className="">Order Placed Successfully</h1>
      <button
        className="successButton"
        onClick={() => navigate(ROUTES.MyOrders)}
      >
        See My Orders
      </button>
    </div>
  );
};

export default OrderPlaced;
