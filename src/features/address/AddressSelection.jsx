import { Link } from "react-router-dom";
const AddressSelection = ({ selectedAddress, handleAddress, user }) => {
  return (
    <div className="card p-3">
      <label className="card-text fw-semibold fs-5">
        Select one address for delivery:{" "}
      </label>
      {/* select one address from number given in user details  */}
      <select
        className="form-select"
        value={selectedAddress}
        onChange={(event) => handleAddress(event)}
      >
        {user[0]?.address.map((locate, index) => (
          <option value={locate} key={index}>
            {locate}
          </option>
        ))}
      </select>
      <div className="my-3">
        <p>Selected Address: {selectedAddress || user[0]?.address[0]}</p>
        <Link className="btn btn-outline-primary" to="/checkout">
          Go to checkout
        </Link>
      </div>
    </div>
  );
};
export default AddressSelection;
