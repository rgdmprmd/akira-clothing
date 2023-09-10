import { useContext } from "react";
import "./checkout-item.styles.scss";
import { CartContext } from "../../contexts/cart.context";

const CheckoutItem = ({ cartItem }) => {
	const { addToCart, removeFromCart } = useContext(CartContext);

	const { name, imageUrl, price, quantity } = cartItem;

	const addToCartHandler = () => addToCart(cartItem);
	const removeFromCartHandler = () => removeFromCart(cartItem);
	const clearItemHandler = () => removeFromCart({ ...cartItem, quantity: 1 });

	return (
		<div className="checkout-item-container">
			<div className="image-container">
				<img src={imageUrl} alt={`${name}`} />
			</div>
			<span className="name">{name}</span>
			<span className="quantity">
				<div className="arrow" onClick={removeFromCartHandler}>
					&#10094;
				</div>
				<span className="value">{quantity}</span>
				<div className="arrow" onClick={addToCartHandler}>
					&#10095;
				</div>
			</span>
			<span className="price">${price}</span>
			<div className="remove-button" onClick={clearItemHandler}>
				&#10005;
			</div>
		</div>
	);
};

export default CheckoutItem;
