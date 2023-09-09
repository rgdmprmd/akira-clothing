import SHOP_DATA from "../../shop-data.json";

const Shop = () => {
	return (
		<div>
			<h1>Shop</h1>
			{SHOP_DATA.map((product) => (
				<div key={product.id}>
					<h3>{product.name}</h3>
				</div>
			))}
		</div>
	);
};

export default Shop;
