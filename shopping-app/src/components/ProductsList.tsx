import { useEffect, useReducer } from "react";
import productReducer from "../reducers/productReducer";

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

  return (
    <div>
      <h1>Products List</h1>
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
                <h4> {product.title}</h4>
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
        <div style={{ width: "20%", padding: "10px" }}>
          {productState.products.map((product) => {
            return (
              <div>
                {product.product.title}
                <ProductQuan productDetails={product} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
