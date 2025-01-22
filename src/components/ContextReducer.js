import React, { createContext, useContext, useReducer, useEffect } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            let existingItemIndex = state.findIndex(
                (item) => item.id === action.id && item.size === action.size
            );
            if (existingItemIndex !== -1) {
                let updatedState = [...state];
                updatedState[existingItemIndex].qty += action.qty;
                updatedState[existingItemIndex].price += action.price;
                return updatedState;
            }
            return [
                ...state,
                {
                    id: action.id,
                    name: action.name,
                    qty: action.qty,
                    size: action.size,
                    price: action.price,
                    img: action.img,
                },
            ];

        case "REMOVE":
            return state.filter((_, index) => index !== action.index);

        case "UPDATE":
            return state.map((item) =>
                item.id === action.id && item.size === action.size
                    ? {
                          ...item,
                          qty: action.qty,
                          price: (item.price / item.qty) * action.qty,
                      }
                    : item
            );

        case "CLEAR_CART":
            return [];

        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
};

export const CartProvider = ({ children }) => {
    const initialState = JSON.parse(localStorage.getItem("cartItems")) || [];
    const [state, dispatch] = useReducer(reducer, initialState);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(state));
    }, [state]);

    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
