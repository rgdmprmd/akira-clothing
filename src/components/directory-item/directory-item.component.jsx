import { BackgroundImage, DirectoryItemBody, DirectoryItemContainer } from "./directory-item.styles";

const DirectoryItem = ({ category }) => {
	const { title, imageUrl, route } = category;

	return (
		<DirectoryItemContainer to={route}>
			<BackgroundImage imageurl={imageUrl} />
			<DirectoryItemBody>
				<h2>{title}</h2>
				<p>Shop Now</p>
			</DirectoryItemBody>
		</DirectoryItemContainer>
	);
};

export default DirectoryItem;
