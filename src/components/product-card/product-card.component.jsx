import { useContext } from "react";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { CartContext } from "../../contexts/cart.context";
import { ProductCardContainer, ProductFooter, ProductImage, ProductName } from "./product-card.styles";

const ProductCard = ({ product }) => {
	const { name, price, imageUrl } = product;
	const { addToCart } = useContext(CartContext);

	const handleAddToCart = () => addToCart(product);

	return (
		<ProductCardContainer>
			<ProductImage src={imageUrl} alt={`${name}`} />
			<ProductFooter>
				<ProductName>{name}</ProductName>
				<ProductName>{price}</ProductName>
			</ProductFooter>

			<Button type="button" buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={handleAddToCart}>
				Add to cart
			</Button>
		</ProductCardContainer>
	);
};

export default ProductCard;
