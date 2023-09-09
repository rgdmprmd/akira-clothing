import "./cart-item.styles.scss";

const CartItem = ({ item }) => {
	const { name, quantity, price } = item;
	return (
		<div className="cart-item-container">
			<span>
				{name} x {quantity}
			</span>
		</div>
	);
};

export default CartItem;
