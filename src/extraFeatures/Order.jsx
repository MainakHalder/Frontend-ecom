import { useEffect } from "react";
import { fetchOrder, deleteOrder } from "./orderSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinners from "../components/Spinners";
const Order = () => {
  const dispatch = useDispatch();
  const { status, orders } = useSelector((state) => state.order);
  console.log(orders);
  useEffect(() => {
    dispatch(fetchOrder());
  }, [dispatch]);
  const deleteOrders = (orderId) => {
    dispatch(deleteOrder(orderId));
  };
  return (
    <>
      {orders.length ? (
        <>
          {status === "loading" ? (
            <Spinners />
          ) : (
            <>
              {orders.length < 3 ? (
                <div className="row my-3">
                  <h2 className="text-center text-secondary">Last orders</h2>
                  {orders.map(({ order, address, _id, createdAt }) => (
                    <div className="col-md-4" key={_id}>
                      <div className="card">
                        <h5 className="card-header">
                          Ordered At: {createdAt.slice(0, 10)}
                        </h5>
                        <div className="card-body">
                          <ul className="list-group">
                            {order.map((item) => (
                              <li className="list-group-item">
                                <p className="text-secondary">
                                  Name: {item.product}
                                </p>
                                <p className="text-secondary">
                                  Quantity: {item.quantity}
                                </p>
                                <p className="text-secondary">
                                  Price: {item.price}
                                </p>
                              </li>
                            ))}
                          </ul>
                          <p className="card-text text-secondary my-3">
                            Total Price:{" "}
                            {order.reduce(
                              (acc, cur) => (acc += cur.price * cur.quantity),
                              0
                            )}
                          </p>
                          <p className="card-text text-secondary">
                            Address: {address}
                          </p>
                          <button
                            className="btn btn-secondary"
                            onClick={() => deleteOrders(_id)}
                          >
                            Delete order
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="row my-3">
                  <h1 className="text-center text-secondary">Last 3 orders</h1>
                  {[
                    orders[orders.length - 3],
                    orders[orders.length - 2],
                    orders[orders.length - 1],
                  ].map(({ order, address, _id, createdAt }) => (
                    <div className="col-md-4" key={_id}>
                      <div className="card">
                        <h5 className="card-header">
                          Ordered At: {createdAt.slice(0, 10)}
                        </h5>
                        <div className="card-body">
                          <ul className="list-group">
                            {order.map((item) => (
                              <li className="list-group-item">
                                <p className="text-secondary">
                                  {item.product} Quantity: {item.quantity}{" "}
                                  Price: {item.price}
                                </p>
                              </li>
                            ))}
                          </ul>
                          <p className="card-text text-secondary my-3">
                            Total Price:{" "}
                            {order.reduce(
                              (acc, cur) => (acc += cur.price * cur.quantity),
                              0
                            )}
                          </p>
                          <p className="card-text text-secondary">
                            Address: {address}
                          </p>
                          <button
                            className="btn btn-secondary"
                            onClick={() => deleteOrders(_id)}
                          >
                            Delete order
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <h2>No order history present</h2>
      )}
    </>
  );
};
export default Order;

// There is a conditional rendering which checks if the order history is more than 3 or not.
// If it is then it shows the last 3 orders
