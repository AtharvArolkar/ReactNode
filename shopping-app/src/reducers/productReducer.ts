const productReducer = (
  state: { data: any[]; products: { product: any; quantity: number }[] },
  action: {
    type: "ADD" | "INC" | "DEC" | "INIT";
    payload: { productId?: string; data: any[] };
  }
) => {
  const { data, products } = state || {};
  const { payload, type } = action;
  switch (type) {
    case "ADD": {
      const fetchProduct = data?.find((pro) => pro.id === payload.productId);
      if (fetchProduct) {
        products.push({ product: fetchProduct, quantity: 1 });
        return { ...state, products };
      }
      return state;
    }
    case "INIT": {
      return { data: payload.data, products: [] };
    }
    case "INC": {
      const proInCart = products.find(
        (pro) => pro.product.id === payload.productId
      );
      if (!proInCart) return state;
      return {
        ...state,
        products: [
          ...state.products.filter(
            (pro) => pro.product.id !== payload.productId
          ),
          { ...proInCart, quantity: ++proInCart.quantity },
        ],
      };
    }

    case "DEC": {
      const proInCart = products.find(
        (pro) => pro.product.id === payload.productId
      );
      if (!proInCart?.product) return state;
      if (proInCart.quantity === 1) {
        return {
          ...state,
          products: [
            ...state.products.filter(
              (pro) => pro.product.id !== payload.productId
            ),
          ],
        };
      }
      return {
        ...state,
        products: [
          ...state.products.filter(
            (pro) => pro.product.id !== payload.productId
          ),
          { ...proInCart, quantity: proInCart.quantity - 1 },
        ],
      };
    }
    default:
      return state;
  }
};
export default productReducer;
