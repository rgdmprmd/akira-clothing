import { createContext, useState } from "react";

const addCartItemHelper = (cartItems, productToAdd) => {
	console.log({ cartItems, productToAdd });
	let cartItemWithId = -1;

	// Find cartItems contains productToAdd.id
	if (cartItems.length > 0) {
		console.log("check id");
		cartItemWithId = cartItems.findIndex((item) => item.id === productToAdd.id);
		console.log({ cartItemWithId });
	}

	if (cartItemWithId >= 0) {
		// If found increment the cartItems.id.qty
		cartItems[cartItemWithId].quantity += 1;
		console.log(`newCartItems with increment qty`, cartItemWithId, cartItems[cartItemWithId]);
	} else {
		console.log(`newCartItems`);
		// return new array with modified cartItems/newCartItems
		cartItems.push({ ...productToAdd, quantity: 1 });
	}

	return cartItems;
};

// as the actual value you want to access
export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	addToCart: () => {},
});

export const CartProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([]);

	console.log({ cartItems });

	const addToCart = (productToAdd) => {
		// console.log("receive productToAdd", productToAdd);
		setCartItems((prev) => addCartItemHelper(prev, productToAdd));
	};

	const value = { isCartOpen, setIsCartOpen, addToCart, cartItems };

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
