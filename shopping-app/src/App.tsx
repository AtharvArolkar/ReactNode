import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import ProductsList from "./components/ProductsList";
import ViewOrder from "./components/ViewOrder";

function App() {
  const navigate = useNavigate();
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h1>Home Page</h1>
              <button
                onClick={() => {
                  navigate("/products");
                }}
              >
                Go to products
              </button>
            </div>
          }
        />
        <Route path="/products" element={<ProductsList />} />
        <Route path="/view-order" element={<ViewOrder />} />
      </Routes>
    </>
  );
}

export default App;
