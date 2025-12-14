import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import ProductsList from "./components/ProductsList";

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
      </Routes>
    </>
  );
}

export default App;
