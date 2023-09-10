import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { CartIconContainer, CartItemCount, CartShoppingIcon } from "./cart-icon.styles";

const CartIcon = () => {
	const { setIsCartOpen, cartCount } = useContext(CartContext);
	const toggleCart = () => setIsCartOpen((prev) => !prev);

	return (
		<CartIconContainer onClick={toggleCart}>
			<CartShoppingIcon />
			<CartItemCount>{cartCount}</CartItemCount>
		</CartIconContainer>
	);
};

export default CartIcon;
