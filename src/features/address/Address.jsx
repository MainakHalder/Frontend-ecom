import { fetchUser, updateUser, setAddress } from "./addressSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditUserForm from "./EditUserForm";
import Spinners from "../../components/Spinners";
import UserDetails from "./UserDetails";
import AddressSelection from "./AddressSelection";

const Address = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  const { userStatus, user } = useSelector((state) => state.address);
  const { selectedAddress } = useSelector((state) => state.address);
  const [userForm, setUserForm] = useState(
    user.length
      ? user[0]
      : { userName: "", email: "", password: "", address: [] }
  );
  const [showPin, setShowPin] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [addressText, setAddressText] = useState(
    user.length ? user[0].address.join("\n") : ""
  );
  // Main functionality of the address state  - user address is converted into strings in new lines for viewing in form

  const handleSubmit = () => {
    let newAddress = addressText
      .split("\n")
      .map((item) => item.trim())
      .filter((item) => item !== "");
    dispatch(
      updateUser({
        userId: user[0]._id,
        updatedUser: { ...userForm, address: newAddress },
      })
    );
  };
  // Main functionality of handle submit
  //  1) addresses in different lines is converted to array
  //  2) spaces from front and back is trimed out
  //  3) If there is any unwanted space got added in array it will be filtered out

  const handleAddress = (event) => {
    dispatch(setAddress(event.target.value));
  };

  const handleEdit = () => {
    setUserForm(user[0]);
    setAddressText(user[0].address.join("\n"));
    if (user[0].address.length) {
      setEditAddress(!editAddress);
    }
  }; // toggle for viewing user form

  const PasswordButton = () => {
    return (
      <>
        <button
          className={`btn ${
            showPin ? "btn-outline-secondary" : "btn-secondary"
          } my-1 mx-1`}
          onClick={() => setShowPin(!showPin)}
        >
          {showPin ? "Hide" : "Show"}
        </button>
      </>
    );
  };
  return (
    <>
      {userStatus === "loading" ? (
        <Spinners />
      ) : (
        <div className="bg-body-tertiary">
          <div className="container p-3">
            <UserDetails
              user={user}
              selectedAddress={selectedAddress}
              handleEdit={handleEdit}
              editAddress={editAddress}
            />
            <div className="row my-3">
              {editAddress && (
                <EditUserForm
                  userForm={userForm}
                  setUserForm={setUserForm}
                  showPin={showPin}
                  PasswordButton={PasswordButton}
                  handleSubmit={handleSubmit}
                  addressText={addressText}
                  setAddressText={setAddressText}
                />
              )}
              <div className={`${editAddress ? "col-md-6" : "col-md-12"} my-3`}>
                <AddressSelection
                  selectedAddress={selectedAddress}
                  handleAddress={handleAddress}
                  user={user}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Address;
