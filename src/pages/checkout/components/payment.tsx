import { useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

const Payment = ({
  setPaymentMethod,
  createOrder,
}: {
  setPaymentMethod: (method: string) => void;
  createOrder: () => void;
}) => {
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [netBankingId, setNetBankingId] = useState("");
  const [netBankingPassword, setNetBankingPassword] = useState("");

  const clearFields = () => {
    setUpiId("");
    setCardNumber("");
    setExpiryDate("");
    setCvv("");
    setNetBankingId("");
    setNetBankingPassword("");
  };

  const handlePaymentChange = (method: string) => {
    clearFields();
    setSelectedPayment(method);
  };

  const isFormValid = () => {
    switch (selectedPayment) {
      case "upi":
        return upiId.trim() !== "";
      case "cc":
        return (
          cardNumber.trim() !== "" &&
          expiryDate.trim() !== "" &&
          cvv.trim().length === 3
        );
      case "netBanking":
        return netBankingId.trim() !== "" && netBankingPassword.trim() !== "";
      default:
        return false;
    }
  };

  const handlePlaceOrder = () => {
    createOrder();
  };
  useEffect(() => {
    if (selectedPayment) {
      setPaymentMethod(selectedPayment);
    }
  }, [selectedPayment]);
  return (
    <div className="paymentContainer">
      <h2>Payment Options</h2>
      <div className="dataRow">
        <div
          onClick={() => handlePaymentChange("upi")}
          className={`center spaceBetween ${
            selectedPayment === "upi" && "optionHead"
          }`}
        >
          <p>Pay by UPI</p>
          <MdKeyboardArrowDown />
        </div>
        {selectedPayment === "upi" && (
          <div>
            <p className="topLabel">UPI ID*</p>
            <input
              type="text"
              className="inputField"
              placeholder="Enter your UPI ID here"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
          </div>
        )}
      </div>
      <div className="dataRow">
        <div
          onClick={() => handlePaymentChange("cc")}
          className={`center spaceBetween ${
            selectedPayment === "cc" && "optionHead"
          }`}
        >
          <p>Pay by Credit Card</p>
          <MdKeyboardArrowDown />
        </div>
        {selectedPayment === "cc" && (
          <div>
            <div>
              <p className="topLabel">Card Number*</p>
              <input
                type="text"
                className="inputField"
                placeholder="Enter your card number here"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </div>
            <div className="center gap">
              <div className="fullWidth">
                <p className="topLabel">Expiry on*</p>
                <input
                  type="text"
                  className="inputField"
                  placeholder="MM/DD"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
              </div>
              <div className="fullWidth">
                <p className="topLabel">CVV*</p>
                <input
                  type="password"
                  className="inputField"
                  placeholder="Enter CVV"
                  maxLength={3}
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="dataRow">
        <div
          onClick={() => handlePaymentChange("netBanking")}
          className={`center spaceBetween ${
            selectedPayment === "netBanking" && "optionHead"
          }`}
        >
          <p>Pay by Net Banking</p>
          <MdKeyboardArrowDown />
        </div>
        {selectedPayment === "netBanking" && (
          <div>
            <div>
              <p className="topLabel">Net Banking User ID*</p>
              <input
                type="text"
                className="inputField"
                placeholder="Enter your User ID here"
                value={netBankingId}
                onChange={(e) => setNetBankingId(e.target.value)}
              />
            </div>
            <div>
              <p className="topLabel">Password*</p>
              <input
                type="password"
                className="inputField"
                placeholder="Enter your password here"
                value={netBankingPassword}
                onChange={(e) => setNetBankingPassword(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>
      <button
        className="successButton secondaryButton"
        onClick={handlePlaceOrder}
        disabled={!isFormValid()}
      >
        Place Order
      </button>
    </div>
  );
};

export default Payment;
