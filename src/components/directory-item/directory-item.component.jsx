import { BackgroundImage, DirectoryItemBody, DirectoryItemContainer } from "./directory-item.styles";

const DirectoryItem = ({ category }) => {
	const { title, imageUrl } = category;

	return (
		<DirectoryItemContainer to={`shop/${title}`}>
			<BackgroundImage imageurl={imageUrl} />
			<DirectoryItemBody>
				<h2>{title}</h2>
				<p>Shop Now</p>
			</DirectoryItemBody>
		</DirectoryItemContainer>
	);
};

export default DirectoryItem;
