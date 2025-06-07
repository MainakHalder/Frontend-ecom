const FilterProducts = ({
  filter,
  sortBy,
  handleFilter,
  handleClear,
  handleSort,
}) => {
  return (
    <div className="col-3 mx-1">
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
  );
};
export default FilterProducts;
