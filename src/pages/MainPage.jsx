import { useEffect } from "react";
import { fetchCategories } from "../features/products/productSlice";
import { setFilter } from "../features/products/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
const MainPage = () => {
  const dispatch = useDispatch();
  const { categories, filter } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  const handleLink = (categoryName) => {
    if (!filter.category.includes(categoryName)) {
      let categoryArr = filter.category;
      categoryArr = [...categoryArr, categoryName];
      dispatch(setFilter({ filterBy: "category", filterValue: categoryArr }));
    }
  };
  return (
    <>
      <div className="bg-body-tertiary text-secondary text-center">
        <div className="container p-3">
          <section className="mb-5 text-center">
            <div className="my-3">
              <h1>Welcome To EMax</h1>
              <h4>
                <em>“Everything You Want, Just a Click Away.”</em>
              </h4>
            </div>
            <div id="carouselExample" className="carousel slide">
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <Link to="/products">
                    <img
                      src="https://ik.imagekit.io/dzh6adrkw/ecom-img.jpg?updatedAt=1748860838281"
                      className="d-block w-100 img-fluid"
                      alt="img1"
                    />
                  </Link>
                </div>
                <div className="carousel-item">
                  <Link to="/products">
                    <img
                      src="https://ik.imagekit.io/dzh6adrkw/ecom-section.jpg?updatedAt=1748862010277"
                      className="d-block w-100 img-fluid"
                      alt="img2"
                    />
                  </Link>
                </div>
                <div className="carousel-item">
                  <img
                    src="https://ik.imagekit.io/dzh6adrkw/ecom%20-carousel.jpg?updatedAt=1748864989741"
                    className="d-block w-100 img-fluid"
                    alt="img3"
                  />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExample"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExample"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </section>
          <hr />
          <section className="my-5 text-center">
            <h1 className="my-1">Our Speciality</h1>
            <div className="row d-flex justify-content-around">
              {categories.map(({ name }, index) => (
                <div className="col-md-3 my-3 mx-3" key={index}>
                  <Link
                    to="/products"
                    style={{ textDecoration: "none", color: "inherit" }}
                    onClick={() => handleLink(name)}
                    className="text-info"
                  >
                    <h3 className="card-header my-3">{name.toUpperCase()}</h3>
                  </Link>
                </div>
              ))}
              <img
                src="https://ik.imagekit.io/dzh6adrkw/ecom-section2.png?updatedAt=1748863288011"
                alt="section-image"
                className="img-top img-fluid my-3"
                style={{ height: "450px", width: "700px" }}
              />
            </div>
            <Link className="btn btn-outline-primary" to="/products">
              View all products
            </Link>
          </section>
          <hr />
          <section className="my-3 text-center">
            <div className="row d-flex justify-content-around">
              <h1 className="fw-semibold">User Testimonials</h1>
              <div className="col-md-3 my-3">
                <div className="card">
                  <div className="card-body">
                    <figure>
                      <blockquote className="blockquote">
                        <p>Seemless experience with easy buy options.</p>
                      </blockquote>
                      <figcaption className="blockquote-footer my-1">
                        <cite title="Source Title" className="fs-5">
                          Jon Doe
                        </cite>
                      </figcaption>
                    </figure>
                  </div>
                </div>
              </div>
              <div className="col-md-3 my-3">
                <div className="card">
                  <div className="card-body">
                    <figure>
                      <blockquote className="blockquote">
                        <p>Wide Range of products with great details.</p>
                      </blockquote>
                      <figcaption className="blockquote-footer my-1">
                        <cite title="Source Title" className="fs-5">
                          Alex Williams
                        </cite>
                      </figcaption>
                    </figure>
                  </div>
                </div>
              </div>
              <div className="col-md-3 my-3">
                <div className="card">
                  <div className="card-body">
                    <figure>
                      <blockquote className="blockquote">
                        <p>
                          Nice options for filtering and selecting products.
                        </p>
                      </blockquote>
                      <figcaption className="blockquote-footer my-1">
                        <cite title="Source Title" className="fs-5">
                          Jay Prichett
                        </cite>
                      </figcaption>
                    </figure>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
export default MainPage;
