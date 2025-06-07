import { Link } from "react-router-dom";
const RelatedProducts = ({ categoryProducts }) => {
  return (
    <div className="my-1">
      <h3>More items you may like in apparel</h3>
      <div className="d-flex flex-row flex-wrap">
        {categoryProducts.map(({ _id, name, price, image }) => (
          <div className="card mx-3 text-center my-3" key={_id}>
            <Link
              to={`/products/${_id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <img
                src={image}
                alt={name}
                className="img-fluid card-img-top"
                style={{
                  height: "150px",
                  width: "330px",
                  objectFit: "cover",
                }}
              />
              <div className="card-body">
                <h3>{name}</h3>
                <p>
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
                  {price}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
export default RelatedProducts;
