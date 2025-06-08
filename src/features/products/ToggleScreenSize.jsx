const ToggleScreenSize = ({ toggleSize, setToggleSize }) => {
  return (
    <div
      className="bg-body-tertiary text-center p-3 container-fluid my-3"
      style={{
        position: "fixed",
        zIndex: 10,
        marginTop: "auto",
        bottom: -16,
        left: 0,
        right: 0,
        borderTop: "1px solid blue",
      }}
    >
      <button
        className="btn btn-outline-primary mx-5"
        onClick={() => setToggleSize(!toggleSize)}
      >
        Toggle Filter
      </button>
    </div>
  );
};
export default ToggleScreenSize;
