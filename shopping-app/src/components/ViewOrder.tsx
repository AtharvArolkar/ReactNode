import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ViewOrder() {
  const [order, setOrder] = useState([]);
  useEffect(() => {
    const fetchOrder = async (): Promise<void> => {
      try {
        const response = await fetch("http://localhost:3000/view-order");
        const data = await response.json();
        setOrder(data.products);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrder();
  }, []);
  return (
    <div>
      <h1> ViewOrder</h1>
      <Link to="/products">Continue shopping</Link>
      <div
        style={{
          borderBottom: "1px solid grey",
          paddingBlock: "10px",
          marginBottom: "10px",
        }}
      >
        {order.map((ord) => {
          return (
            <div
              style={{
                display: "flex",
                justifyItems: "center",
                gap: 2,
                flexDirection: "column",
                border: "1px solid grey",
                borderRadius: "10px",
                padding: "10px",
              }}
              key={ord.product.id}
            >
              <div>{ord.product.title}</div>
              <div>{ord.quantity}</div>
              <div>${ord.product.price * ord.quantity}</div>
            </div>
          );
        })}
      </div>
      <h1 style={{ color: "red" }}>
        TOTAL:{" "}
        {order.reduce((prev, curr) => {
          return (prev += curr.product.price * curr.quantity);
        }, 0)}
      </h1>
    </div>
  );
}
