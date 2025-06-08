const FilterProducts = ({
  filter,
  sortBy,
  handleFilter,
  handleClear,
  handleSort,
  toggleSize,
}) => {
  return (
    <>
      <div
        className={
          !toggleSize ? "mx-1 text-center mt-5 p-5" : "col-3 mx-1 mt-2"
        }
      >
        <div className="d-flex justify-content-between flex-wrap">
          <div>
            <h3>Filter</h3>
          </div>
          <div>
            <button className="btn btn-secondary" onClick={handleClear}>
              Clear
            </button>
          </div>
        </div>
        <div className="my-3">
          <label htmlFor="customRange2" className="form-label">
            <h3>Price:</h3>
          </label>
          <div style={{ width: "100%" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "0.5rem",
                padding: "0 0.25rem",
                fontSize: "0.9rem",
                color: "#6c757d",
                userSelect: "none",
              }}
            >
              <span className="text-muted text-secondary fw-bold">₹100</span>
              <span className="text-muted text-secondary fw-bold">₹44000</span>
              <span className="text-muted text-secondary fw-bold">₹88000</span>
            </div>
            <input
              type="range"
              className="form-range"
              min="100"
              max="88000"
              step="1000"
              id="customeRange2"
              onChange={(event) => handleFilter("price", event.target.value)}
              value={filter.price}
            />
          </div>
        </div>
        <div className="my-3">
          <label>
            <h3>Category: </h3>
          </label>{" "}
          <br />
          <input
            type="checkbox"
            name="categories"
            value="electronics"
            onChange={(event) => handleFilter("category", event.target)}
            checked={filter.category.includes("electronics")}
          />{" "}
          Electronics
          <br />
          <input
            type="checkbox"
            name="categories"
            value="clothing"
            onChange={(event) => handleFilter("category", event.target)}
            checked={filter.category.includes("clothing")}
          />{" "}
          Clothing <br />
          <input
            type="checkbox"
            name="categories"
            value="household"
            onChange={(event) => handleFilter("category", event.target)}
            checked={filter.category.includes("household")}
          />{" "}
          Household
        </div>
        <div className="my-3">
          <h3>Rating: </h3>
          <input
            type="radio"
            name="ratings"
            value={4}
            onChange={(event) => handleFilter("rating", event.target.value)}
            checked={filter.rating == 4}
          />{" "}
          4 Stars or above
          <br />
          <input
            type="radio"
            name="ratings"
            value={3}
            onChange={(event) => handleFilter("rating", event.target.value)}
            checked={filter.rating == 3}
          />{" "}
          3 Stars or above
          <br />
          <input
            type="radio"
            name="ratings"
            value={2}
            onChange={(event) => handleFilter("rating", event.target.value)}
            checked={filter.rating == 2}
          />{" "}
          2 Stars or above
          <br />
          <input
            type="radio"
            name="ratings"
            value={1}
            onChange={(event) => handleFilter("rating", event.target.value)}
            checked={filter.rating == 1}
          />{" "}
          1 Stars or above
          <br />
        </div>
        <div className="my-3">
          <h3>Sort By:</h3>
          <input
            type="radio"
            name="sort"
            value="low"
            onChange={(event) => handleSort(event.target.value)}
            checked={sortBy === "low"}
          />{" "}
          Low to High
          <br />
          <input
            type="radio"
            name="sort"
            value="high"
            onChange={(event) => handleSort(event.target.value)}
            checked={sortBy === "high"}
          />{" "}
          High to low
          <br />
        </div>
      </div>
    </>
  );
};
export default FilterProducts;
