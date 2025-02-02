import { calculateDeliveryDate } from "../../../utils/common";
import { IAddress } from "../../../utils/types/checkout";

const Summary = ({
  setStep,
  address,
  totalPrice,
  totalItems,
}: {
  setStep: (step: number) => void;
  address: IAddress;
  totalPrice: string;
  totalItems: string;
}) => {
  const date = new Date();

  return (
    <div>
      <p className="itemsRow dataRow">
        <span className="dataHead">Total items: </span>
        {totalItems}
      </p>
      <p className="priceRow dataRow">
        <span className="dataHead">Price: </span>₹{totalPrice}
      </p>
      <div className="center spaceBetween dataRow">
        <div className="addressRow ">
          <span className="dataHead">Deliver to: </span>
          <span>
            <p>{address.name},</p>
            <p>{address.lane1},</p>
            <p>{address.lane2},</p>
            <p>{address.city},</p>
            <p>{address.state},</p>
            <p>{address.postalCode}</p>
            <p>+91 {address.phoneNumber}</p>
          </span>
        </div>
        <p onClick={() => setStep(1)} className="dateRow pointer">
          Edit
        </p>
      </div>
      <p className="dateRow dataRow">
        <span className="dataHead">Delivery by: </span>
        {calculateDeliveryDate(date)}
      </p>
      <button className="successButton" onClick={() => setStep(3)}>
        Continue
      </button>
    </div>
  );
};

export default Summary;
