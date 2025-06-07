const EditUserForm = ({
  userForm,
  setUserForm,
  showPin,
  PasswordButton,
  handleSubmit,
  addressText,
  setAddressText,
}) => {
  return (
    <div className="col-md-6 my-3">
      <div className="card">
        <div className="card-body">
          <div className="mb-3">
            <label>Name: </label>
            <input
              type="text"
              className="form-control mx-1"
              value={userForm?.userName}
              onChange={(event) =>
                setUserForm({
                  ...userForm,
                  userName: event.target.value,
                })
              }
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-3">
            <label> Email: </label>
            <input
              type="text"
              className="form-control mx-1"
              value={userForm?.email}
              onChange={(event) =>
                setUserForm({
                  ...userForm,
                  email: event.target.value,
                })
              }
              placeholder="name@example.com"
            />
          </div>
          <div className="mb-3">
            <label> Password: </label>
            <input
              type={showPin ? "text" : "password"}
              className="form-control mx-1"
              value={userForm?.password}
              onChange={(event) =>
                setUserForm({
                  ...userForm,
                  password: event.target.value,
                })
              }
              placeholder="Enter your password"
            />
            <PasswordButton />
            {/* Toggle password component */}
          </div>
          <div className="mb-3">
            <label>
              Address: (Edit or remove address or add new address in next line)
            </label>
            <textarea
              type="text"
              className="form-control"
              value={addressText}
              rows={8}
              onChange={(event) => setAddressText(event.target.value)}
            ></textarea>
          </div>
          <button className="btn btn-outline-primary" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
export default EditUserForm;
