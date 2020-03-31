export default (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'ADD_CART':
      return { ...state, carts: [...state.carts, payload] };
    case 'UPDATE_CART':
      const { id, operator } = payload;
      const carts = [...state.carts];
      const index = carts.findIndex(cart => cart.id === id);

      if (operator === 'add') carts[index].quantity++;
      else carts[index].quantity--;

      carts[index].totalPrice = carts[index].price * carts[index].quantity;

      return {
        ...state,
        carts
      };
    case 'DELETE_CART':
      return {
        ...state,
        carts: state.carts.filter(cart => cart.id !== payload)
      };
    default:
      return state;
  }
};
