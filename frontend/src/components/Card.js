import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({
	card,
	onCardClick,
	setIsImagePopupOpened,
	onCardLike,
	onCardDelete
}) {
	const currentUser = useContext(CurrentUserContext);
	const isOwn = card.owner._id === currentUser._id;
	const isLiked = card.likes.some(i => i._id === currentUser._id);
	const cardLikeButtonClassName = (`element__like ${isLiked && 'element__like_active'}`);


	function handleCardClick() {
		onCardClick(card);
		setIsImagePopupOpened(true);
	};

	function handleDeleteClick() {
		onCardDelete(card)
	}

	function handleLikeClick() {
		onCardLike(card)
	}

	return (
		<>
			{isOwn && <button
									onClick={handleDeleteClick}
									className="element__delete-button link"
									type="button"
									aria-label="Удалить место"
			/>}
			<img className="element__photo"
				src={card.link}
				alt={card.name}
				onClick={handleCardClick}
			/>
			<div className="element__info">
				<h2 className="element__title">{card.name}</h2>
				<div>
					<button onClick={handleLikeClick} className={cardLikeButtonClassName} type="button" aria-label="Нравится" />
					<p className="element__like-count">{card.likes.length}</p>
				</div>
			</div>
		</>
	)
}

export default Card;