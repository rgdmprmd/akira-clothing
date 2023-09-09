import { useContext } from "react";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

import { CartContext } from "../../contexts/cart.context";

import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
	const { cartItems } = useContext(CartContext);
	console.log("yo", { cartItems });

	return (
		<div className="cart-dropdown-container">
			{cartItems?.map((cart) => (
				<CartItem item={cart} />
			))}
			<div className="cart-items"></div>
			<Button>Checkout</Button>
		</div>
	);
};

export default CartDropdown;
