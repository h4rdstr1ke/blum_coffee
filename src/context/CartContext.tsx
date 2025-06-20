import { createContext, useContext, useReducer, ReactNode, useMemo } from 'react';

type Product = {
    id: number;
    title: string;
    price: number;
    src: string;
};

type CartItem = Product & {
    quantity: number;
};

type CartState = {
    items: CartItem[];
};

type CartAction =
    | { type: 'ADD_ITEM'; payload: Product }
    | { type: 'ADD_ITEMS'; payload: { item: Product; quantity: number } }
    | { type: 'REMOVE_ITEM'; payload: { id: number } }
    | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
    | { type: 'CLEAR_CART' };

type CartContextType = {
    items: CartItem[];
    addToCart: (item: Product) => void;
    addItemsToCart: (item: Product, quantity: number) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;
    totalPrice: number;
    totalItems: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case 'ADD_ITEM':
            const existingItem = state.items.find(item => item.id === action.payload.id);
            return {
                items: existingItem
                    ? state.items.map(item =>
                        item.id === action.payload.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    )
                    : [...state.items, { ...action.payload, quantity: 1 }],
            };
        case 'ADD_ITEMS':
            const existingItemMulti = state.items.find(item => item.id === action.payload.item.id);
            return {
                items: existingItemMulti
                    ? state.items.map(item =>
                        item.id === action.payload.item.id
                            ? { ...item, quantity: item.quantity + action.payload.quantity }
                            : item
                    )
                    : [...state.items, { ...action.payload.item, quantity: action.payload.quantity }],
            };
        case 'REMOVE_ITEM':
            return {
                items: state.items.filter(item => item.id !== action.payload.id),
            };
        case 'UPDATE_QUANTITY':
            return {
                items: state.items.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: Math.max(1, action.payload.quantity) }
                        : item
                ),
            };
        case 'CLEAR_CART':
            return { items: [] };
        default:
            return state;
    }
}

export function CartProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(cartReducer, { items: [] });

    const totalPrice = useMemo(
        () => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
        [state.items]
    );

    const totalItems = useMemo(
        () => state.items.reduce((sum, item) => sum + item.quantity, 0),
        [state.items]
    );

    const value = {
        items: state.items,
        totalPrice,
        totalItems,
        addToCart: (item: Product) => dispatch({ type: 'ADD_ITEM', payload: item }),
        addItemsToCart: (item: Product, quantity: number) =>
            dispatch({ type: 'ADD_ITEMS', payload: { item, quantity } }),
        removeFromCart: (id: number) => dispatch({ type: 'REMOVE_ITEM', payload: { id } }),
        updateQuantity: (id: number, quantity: number) =>
            dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } }),
        clearCart: () => dispatch({ type: 'CLEAR_CART' }),
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}