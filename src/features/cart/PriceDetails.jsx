import { Link } from "react-router-dom";
const PriceDetails = ({
  cart,
  totalPrice,
  coupon,
  deliveryCharges,
  handleCoupon,
}) => {
  return (
    <div className="card p-3">
      <h3 className="fw-semibold text-secondary">Price Details</h3>
      <hr />
      <p className="card-text text-start fs-5">
        Price ({cart?.length || 0} Item) -{" "}
        <span className="float-end">{totalPrice.toString()}</span>
      </p>
      <p className="card-text text-start fs-5">
        Discount -<span className="float-end">{coupon}</span>
      </p>
      <p className="card-text text-start fs-5">
        Delivery Fees -<span className="float-end">{deliveryCharges}</span>
      </p>
      <hr />
      <h4 className="text-start">
        Total Amount:{" "}
        <span className="float-end">
          {(totalPrice - coupon + deliveryCharges).toString()}
        </span>
      </h4>
      <hr />
      <p className="card-text fs-6 text-start">
        Discount Applied: {coupon} Bonanza Sale!{" "}
        <select
          value={coupon}
          className="form-select-sm float-end"
          onChange={(event) => handleCoupon(event.target.value)}
        >
          <option value={500}>Rs. 500/- off</option>
          <option value={750}>Rs. 750/- off</option>
        </select>
      </p>
      <Link className="btn btn-primary" to="/checkout">
        PLACE ORDER
      </Link>
    </div>
  );
};
export default PriceDetails;
