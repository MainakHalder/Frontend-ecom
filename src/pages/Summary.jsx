const Summary = () => {
  return (
    <h1 className="text-secondary d-flex justify-content-center">
      <div className="p-5 my-5">
        Order Placed Successfully
        <div className="card my-5 p-5">
          <div className="card-body">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio1"
                value="option1"
                checked={true}
              />
              <label className="form-check-label" htmlFor="inlineRadio1">
                Order placed
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio2"
                value="option2"
                disabled
              />
              <label className="form-check-label" htmlFor="inlineRadio2">
                Out for delivery
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio3"
                value="option3"
                disabled
              />
              <label className="form-check-label" htmlFor="inlineRadio3">
                Order delivered
              </label>
            </div>
          </div>
        </div>
      </div>
    </h1>
  );
};
export default Summary;
