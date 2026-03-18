const initialState = {
  items: [],
  loading: false,
  error: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS_REQUEST':
    case 'ADD_PRODUCT_REQUEST':
    case 'EDIT_PRODUCT_REQUEST':
    case 'DELETE_PRODUCT_REQUEST':
      return { ...state, loading: true, error: null };

    case 'FETCH_PRODUCTS_SUCCESS':
      return { ...state, loading: false, items: action.payload };

    case 'ADD_PRODUCT_SUCCESS':
      return { 
        ...state, 
        loading: false, 
        items: [action.payload, ...state.items] 
      };

    case 'EDIT_PRODUCT_SUCCESS':
      return {
        ...state,
        loading: false,
        items: state.items.map(p => 
          p.id.toString() === action.payload.id.toString() 
            ? { ...p, ...action.payload } 
            : p
        )
      };

    case 'DELETE_PRODUCT_SUCCESS':
      return {
        ...state,
        loading: false,
        items: state.items.filter(p => p.id.toString() !== action.payload.toString())
      };

    case 'FETCH_PRODUCTS_FAILURE':
    case 'ADD_PRODUCT_FAILURE':
    case 'EDIT_PRODUCT_FAILURE':
    case 'DELETE_PRODUCT_FAILURE':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default productReducer;
