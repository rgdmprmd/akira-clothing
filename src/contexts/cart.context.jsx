import { createContext, useEffect, useState } from "react";

const addCartItemHelper = (cartItems, productToAdd) => {
	// Find cartItems contains productToAdd.id
	const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

	// If found increment the cartItems.id.qty
	if (existingCartItem) {
		return cartItems.map((cartitem) => (cartitem.id === productToAdd.id ? { ...cartitem, quantity: cartitem.quantity + 1 } : cartitem));
	}

	// return new array with modified cartItems/newCartItems
	return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItemHelper = (cartItems, productToRemove) => {
	// If the cart quantity < 1 will be remove from cartItems
	if (productToRemove.quantity === 1) {
		return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
	}

	return cartItems.map((cartitem) => (cartitem.id === productToRemove.id ? { ...cartitem, quantity: cartitem.quantity - 1 } : cartitem));
};

// as the actual value you want to access
export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	addToCart: () => {},
	removeFromCart: () => {},
	cartCount: 0,
	cartAmount: 0,
});

export const CartProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [cartCount, setCartCount] = useState(0);
	const [cartAmount, setCartAmount] = useState(0);

	useEffect(() => {
		const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
		setCartCount(newCartCount);
	}, [cartItems]);

	useEffect(() => {
		const newCartAmount = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
		setCartAmount(newCartAmount);
	}, [cartItems]);

	const addToCart = (productToAdd) => {
		setCartItems((prev) => addCartItemHelper(prev, productToAdd));
	};

	const removeFromCart = (productToRemove) => {
		setCartItems((prev) => removeCartItemHelper(prev, productToRemove));
	};

	const value = { isCartOpen, setIsCartOpen, addToCart, removeFromCart, cartItems, cartCount, cartAmount };

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
