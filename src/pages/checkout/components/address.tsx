import React from "react";
import { IAddress } from "../../../utils/types/checkout";
import toast from "react-hot-toast";
import { ToastMessage } from "../../../enums/toast";

const Address = ({
  setStep,
  setAddress,
  address,
}: {
  setStep: (step: number) => void;
  setAddress: (e: IAddress) => void;
  address: IAddress;
}) => {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };
  const handleNext = () => {
    if (
      !address.lane1.trim() ||
      !address.lane2.trim() ||
      !address.name.trim() ||
      !address.state.trim() ||
      !address.postalCode.trim() ||
      !address.city.trim()
    ) {
      return toast.error(ToastMessage.requiredField);
    } else {
      return setStep(2);
    }
  };
  return (
    <div className="fullWidth">
      <h3 className="formHead">Delivery Details</h3>
      <div className="center gap">
        <div className="fullWidth">
          <p className="topLabel">Name*</p>
          <input
            className="inputField"
            type="text"
            placeholder="Enter here..."
            name="name"
            onChange={handleInput}
            value={address.name}
          />
        </div>
        <div className="fullWidth">
          <p className="topLabel">Phone number*</p>
          <input
            className="inputField"
            type="number"
            placeholder="Enter here..."
            name="phoneNumber"
            onChange={handleInput}
            value={address.phoneNumber}
          />
        </div>
      </div>
      <div>
        <p className="topLabel">Lane 1*</p>
        <input
          className="inputField"
          type="text"
          placeholder="Enter here..."
          name="lane1"
          onChange={handleInput}
          value={address.lane1}
        />
      </div>
      <div>
        <p className="topLabel">Lane 2*</p>
        <input
          className="inputField"
          type="text"
          placeholder="Enter here..."
          name="lane2"
          onChange={handleInput}
          value={address.lane2}
        />
      </div>
      <div>
        <p className="topLabel">City*</p>
        <input
          className="inputField"
          type="text"
          placeholder="Enter here..."
          name="city"
          onChange={handleInput}
          value={address.city}
        />
      </div>
      <div>
        <p className="topLabel">State*</p>
        <input
          className="inputField"
          type="text"
          placeholder="Enter here..."
          name="state"
          onChange={handleInput}
          value={address.state}
        />
      </div>
      <div>
        <p className="topLabel">Postal code*</p>
        <input
          className="inputField"
          type="number"
          placeholder="Enter here..."
          name="postalCode"
          onChange={handleInput}
          value={address.postalCode}
        />
      </div>
      <button className="successButton" onClick={handleNext}>
        Continue
      </button>
    </div>
  );
};

export default Address;
