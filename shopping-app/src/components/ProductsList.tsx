import { useEffect, useReducer } from "react";
import productReducer from "../reducers/productReducer";
import { Link } from "react-router-dom";

export default function ProductsList() {
  const [productState, dispatch] = useReducer(productReducer, {
    data: [],
    products: [],
  });
  useEffect(() => {
    const fetchProducts = async (): Promise<void> => {
      try {
        const response = await fetch("http://localhost:3000/products");
        const data = await response.json();
        dispatch({ type: "INIT", payload: { data: data?.products ?? [] } });
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  const ProductQuan = ({
    productDetails,
  }: {
    productDetails: {
      product: any;
      quantity: number;
    };
  }) => {
    return (
      <div>
        <button
          onClick={() => {
            dispatch({
              type: "DEC",
              payload: {
                productId: productDetails.product.id ?? "",
                data: productState.data,
              },
            });
          }}
        >
          -
        </button>
        <span>{productDetails.quantity}</span>
        <button
          onClick={() => {
            dispatch({
              type: "INC",
              payload: {
                productId: productDetails.product.id ?? "",
                data: productState.data,
              },
            });
          }}
        >
          +
        </button>
      </div>
    );
  };

  const buyProducts = async () => {
    try {
      await fetch("http://localhost:3000/buy-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ products: productState.products }),
      });
      dispatch({ type: "INIT", payload: { data: productState.data ?? [] } });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Products List</h1>
      <Link to="/view-order">View my order</Link>
      <div style={{ display: "flex" }}>
        <div
          style={{ display: "flex", gap: 2, flexWrap: "wrap", width: "80%" }}
        >
          {productState.data.map((product: any) => {
            const proInCart = productState.products.find(
              (pro) => pro.product.id === product.id
            );
            return (
              <div
                style={{
                  border: "1px solid white",
                  borderRadius: "10px",
                  margin: "10px",
                  padding: "10px",
                  height: "300px",
                  width: "200px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                key={product.id}
              >
                <img
                  src={product.images[0]}
                  style={{
                    objectFit: "contain",
                    height: "100px",
                    width: "100px",
                  }}
                />
                <h4>
                  {" "}
                  {product.title}{" "}
                  <div style={{ color: "red" }}> Price: ${product.price}</div>
                </h4>

                <span>{product.description.substring(0, 50)}...</span>
                {proInCart ? (
                  <ProductQuan productDetails={proInCart} />
                ) : (
                  <button
                    onClick={() => {
                      dispatch({
                        type: "ADD",
                        payload: {
                          productId: product.id ?? "",
                          data: productState.data,
                        },
                      });
                    }}
                  >
                    {" "}
                    Add
                  </button>
                )}
              </div>
            );
          })}
        </div>
        <div style={{ width: "20%", padding: "10px", paddingTop: 0 }}>
          <div>
            {productState.products.length > 0 && (
              <h2 style={{ paddingTop: 0 }}>Cart Items</h2>
            )}
            {productState.products
              .sort((a, b) => a.product.title - b.product.title)
              .map((product) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                      alignItems: "flex-start",
                      borderBottom: "1px solid grey",
                      paddingBlock: "10px",
                    }}
                    key={product.product.id}
                  >
                    {product.product.title}
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <ProductQuan productDetails={product} />
                      <div style={{ marginLeft: "10px" }}>
                        {" "}
                        ${product.product.price * product.quantity}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          {productState.products.length > 0 && (
            <div>
              Total :
              <span
                style={{ fontWeight: "bold", marginLeft: "10px", color: "red" }}
              >
                $
                {productState.products.reduce(
                  (prev, curr) => prev + curr.product.price * curr.quantity,
                  0
                )}
              </span>
            </div>
          )}
          {productState.products.length > 0 && (
            <button onClick={buyProducts}>BUY NOW</button>
          )}
        </div>
      </div>
    </div>
  );
}
