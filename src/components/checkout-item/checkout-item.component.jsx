import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { CheckoutItemContainer, CheckoutItemDetail, CheckoutItemQuantity, ImageContainer, QuantityArrow, QuantityValue, RemoveButton } from "./checkout-item.styles";

const CheckoutItem = ({ cartItem }) => {
	const { addToCart, removeFromCart } = useContext(CartContext);

	const { name, imageUrl, price, quantity } = cartItem;

	const addToCartHandler = () => addToCart(cartItem);
	const removeFromCartHandler = () => removeFromCart(cartItem);
	const clearItemHandler = () => removeFromCart({ ...cartItem, quantity: 1 });

	return (
		<CheckoutItemContainer>
			<ImageContainer>
				<img src={imageUrl} alt={`${name}`} />
			</ImageContainer>
			<CheckoutItemDetail>{name}</CheckoutItemDetail>
			<CheckoutItemQuantity>
				<QuantityArrow onClick={removeFromCartHandler}>&#10094;</QuantityArrow>
				<QuantityValue>{quantity}</QuantityValue>
				<QuantityArrow onClick={addToCartHandler}>&#10095;</QuantityArrow>
			</CheckoutItemQuantity>
			<CheckoutItemDetail>${price}</CheckoutItemDetail>
			<RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
		</CheckoutItemContainer>
	);
};

export default CheckoutItem;
