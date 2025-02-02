import "./style.scss";
import Header from "../../components/header";
import { useLocation } from "react-router-dom";
import { useAuthViewModal } from "../auth/authViewModal";
import { useState } from "react";
import Address from "./components/address";
import Summary from "./components/summary";
import Payment from "./components/payment";
import { OrdersRepo } from "../../repositories/orders";
import toast from "react-hot-toast";
import OrderPlaced from "./components/orderPlaced";
import { IAddress } from "../../utils/types/checkout";

enum Tabs {
  Delivery = "Delivery address",
  Summary = "Order summary",
  Payment = "Payment details",
  Success = "Order placed",
}
const Checkout = () => {
  const location = useLocation();
  const { user } = useAuthViewModal();
  const { totalPrice, products, totalItems } = location.state || {};
  const [address, setAddress] = useState<IAddress>({
    name: "",
    phoneNumber: 0,
    lane1: "",
    lane2: "",
    city: "",
    state: "",
    postalCode: "",
  });
  const steps = [
    { name: Tabs.Delivery, onClick: () => setStep(1) },
    { name: Tabs.Summary, onClick: () => setStep(2) },
    { name: Tabs.Payment, onClick: () => setStep(3) },
    { name: Tabs.Success, onClick: () => setStep(4) },
  ];

  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("");
  const createOrder = async () => {
    const payload = {
      user: user._id,
      products,
      totalPrice,
      address: `${address.name}, ${address.lane1}, ${address.lane2}, ${address.city}, ${address.state}, ${address.postalCode}`,
      paymentType: paymentMethod,
      totalItems,
      phoneNumber: address.phoneNumber,
    };
    try {
      const response = await OrdersRepo.createOrder(payload);
      if (response.success) {
        setStep(4);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <Header />
      <div className="center">
        {step === 4 ? (
          <OrderPlaced />
        ) : (
          <div className="checkoutContainer">
            <div className="center stepsContainer">
              {steps.map((item, index) => (
                <div key={`${item}-${index}`} className="center">
                  {index < steps.length - 1 && (
                    <h1
                      className={`count center ${
                        step > index ? "filledLine" : ""
                      }`}
                    >
                      {index + 1}
                    </h1>
                  )}
                  {index < steps.length - 2 && (
                    <div
                      className={`line ${step - 1 > index ? "filledLine" : ""}`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
            {step === 1 && (
              <Address
                setStep={setStep}
                setAddress={setAddress}
                address={address}
              />
            )}
            {step === 2 && (
              <Summary
                setStep={setStep}
                address={address}
                totalPrice={totalPrice}
                totalItems={totalItems}
              />
            )}
            {step === 3 && (
              <Payment
                setPaymentMethod={setPaymentMethod}
                createOrder={createOrder}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Checkout;
