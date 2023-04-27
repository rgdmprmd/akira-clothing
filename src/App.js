import "./categories.styles.scss";

const App = () => {
	const categories = [
		{
			id: 1,
			title: "Hats",
			image: "",
		},
		{
			id: 2,
			title: "Jackets",
			image: "",
		},
		{
			id: 3,
			title: "Sneakers",
			image: "",
		},
		{
			id: 4,
			title: "Womens",
			image: "",
		},
		{
			id: 5,
			title: "Mens",
			image: "",
		},
	];

	return (
		<div className="categories-container">
			{categories.map(({ title, id, image }) => (
				<div className="category-container" key={id}>
					<div className="background-image"></div>
					<div className="category-body-container">
						<h2>{title}</h2>
						<p>Shop Now</p>
					</div>
				</div>
			))}
		</div>
	);
};

export default App;
