const ProductFeatures = ({ selectedProducts, setSize, cartFeatures }) => {
  return (
    <div className="col-md-8">
      <h3 className="fs-3 fw-normal">
        {selectedProducts?.name} {selectedProducts?.productDetails}
      </h3>
      <p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-star-fill mx-3"
          viewBox="0 0 16 16"
        >
          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
        </svg>
        {selectedProducts.ratings} ratings &{" "}
        {Math.ceil(selectedProducts.reviews)} reviews
      </p>
      <h4>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-currency-rupee"
          viewBox="0 0 16 16"
        >
          <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4z" />
        </svg>{" "}
        {selectedProducts.price}{" "}
        <span
          className="text-secondary fs-5 mx-1"
          style={{ textDecoration: "line-through" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-currency-rupee"
            viewBox="0 0 16 16"
          >
            <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4z" />
          </svg>
          {selectedProducts.price + selectedProducts.price * 0.5}
        </span>
      </h4>
      <h4 className="text-secondary">50% off</h4>
      {selectedProducts?.category.name === "clothing" ? (
        <div className="my-5">
          Size:{" "}
          <div className="btn-group" role="group">
            <input
              type="radio"
              className="btn-check"
              name="btnradio"
              id="btnradio1"
              value="small"
              onChange={(event) => setSize(event.target.value)}
            />
            <label
              className="btn btn-outline-secondary mx-1"
              htmlFor="btnradio1"
            >
              S
            </label>
            <input
              type="radio"
              className="btn-check"
              name="btnradio"
              id="btnradio2"
              value="medium"
              onChange={(event) => setSize(event.target.value)}
            />
            <label
              className="btn btn-outline-secondary me-1"
              htmlFor="btnradio2"
            >
              M
            </label>
            <input
              type="radio"
              className="btn-check"
              name="btnradio"
              id="btnradio3"
              value="large"
              onChange={(event) => setSize(event.target.value)}
            />
            <label
              className="btn btn-outline-secondary me-1"
              htmlFor="btnradio3"
            >
              L
            </label>
            <input
              type="radio"
              className="btn-check"
              name="btnradio"
              id="btnradio4"
              value="extra large"
              onChange={(event) => setSize(event.target.value)}
            />
            <label
              className="btn btn-outline-secondary me-1"
              htmlFor="btnradio4"
            >
              XL
            </label>
          </div>
        </div>
      ) : (
        ""
      )}
      <hr />
      <div className="d-flex flex-row flex-wrap">
        {cartFeatures.map(({ image, desc }, index) => (
          <div className="p-3" key={index}>
            <img
              src={image}
              alt={desc}
              className="img-fluid rounded-circle"
              style={{
                width: "20%",
                height: "40%",
                objectFit: "cover",
              }}
            />
            <p>{desc}</p>
          </div>
        ))}
      </div>
      <hr />
      <div className="my-1">
        <h5>Product Specification: </h5>
        <ul>
          {selectedProducts?.specification.split(",").map((specs, index) => (
            <li key={index}>{specs}</li>
          ))}
        </ul>
      </div>
      <hr />
      <div className="my-1">
        <h5>Product Details: </h5>
        {selectedProducts?.productDetails.split(",").map((detail, index) => (
          <li key={index}>{detail}</li>
        ))}
      </div>
    </div>
  );
};
export default ProductFeatures;
