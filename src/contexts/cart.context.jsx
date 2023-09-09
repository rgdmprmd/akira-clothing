import { createContext, useEffect, useState } from "react";

const addCartItemHelper = (cartItems, productToAdd) => {
	console.log({ cartItems, productToAdd });

	// Find cartItems contains productToAdd.id
	const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

	// If found increment the cartItems.id.qty
	if (existingCartItem) {
		return cartItems.map((cartitem) => (cartitem.id === productToAdd.id ? { ...cartitem, quantity: cartitem.quantity + 1 } : cartitem));
	}

	// return new array with modified cartItems/newCartItems
	return [...cartItems, { ...productToAdd, quantity: 1 }];
};

// as the actual value you want to access
export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	addToCart: () => {},
	cartCount: 0,
});

export const CartProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [cartCount, setCartCount] = useState(0);

	useEffect(() => {
		const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
		setCartCount(newCartCount);
	}, [cartItems]);

	const addToCart = (productToAdd) => {
		setCartItems((prev) => addCartItemHelper(prev, productToAdd));
	};

	const value = { isCartOpen, setIsCartOpen, addToCart, cartItems, cartCount };

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
