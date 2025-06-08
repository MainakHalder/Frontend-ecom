const UserDetails = ({ user, selectedAddress, handleEdit, editAddress }) => {
  return (
    <div className="card p-1">
      <h1 className="text-secondary text-center">User Details</h1>
      <hr />
      <div className="card-body d-flex justify-content-between">
        <div className="container-fluid">
          <p className="fs-4 ms-5">
            <strong>Name: </strong> {user[0]?.userName}
          </p>
          <p className="fs-4 ms-5">
            <strong>Email: </strong> {user[0]?.email}
          </p>
          <div className="fs-4 ms-5">
            <div className="mb-3">
              <strong>Address: </strong>{" "}
              {selectedAddress || user[0]?.address[0]}
              {/* selected delivery address */}
            </div>
          </div>
          <button
            className={`btn ${
              editAddress ? "btn-secondary" : "btn-outline-secondary"
            } mx-5`}
            onClick={handleEdit}
          >
            {editAddress ? "Close user form" : "Edit user details"}
          </button>
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            fill="currentColor"
            className="bi bi-person-circle img-fluid"
            viewBox="0 0 16 16"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
            <path
              fillRule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
export default UserDetails;
