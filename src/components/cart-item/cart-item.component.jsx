import { CartItemContainer, CartItemDetails, CartItemImage, CartItemName } from "./cart-item.styles";

const CartItem = ({ item }) => {
	const { name, quantity, imageUrl, price } = item;
	return (
		<CartItemContainer>
			<CartItemImage src={imageUrl} alt={`${name}`} />
			<CartItemDetails>
				<CartItemName>{name}</CartItemName>
				<span className="price">
					{quantity} x ${price}
				</span>
			</CartItemDetails>
		</CartItemContainer>
	);
};

export default CartItem;
