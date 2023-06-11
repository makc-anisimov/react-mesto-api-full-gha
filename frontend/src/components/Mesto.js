import Header from "./Header";
import Main from "./Main";
import Footer from './Footer';
import { useEffect, useState } from 'react';
import ImagePopup from './ImagePopup';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { DataCardsContext } from '../contexts/DataCardsContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function Mesto({
	loggedIn,
	userData
}) {
	const [isEditAvatarPopupOpened, setIsEditAvatarPopupOpened] = useState(false);
	const [isEditProfilePopupOpened, setIsEditProfilePopupOpened] = useState(false);
	const [isAddPlacePopupOpened, setIsAddPlacePopupOpened] = useState(false);
	const [isImagePopupOpened, setIsImagePopupOpened] = useState(false);

	const [selectedCard, setSelectedCard] = useState({});
	const [currentUser, setCurrentUser] = useState({});
	const [cards, setCards] = useState([]);

	useEffect(() => {
		Promise.all([
			api.getProfile(),
			api.getInitialCards()
		])
			.then(([profile, initialCards]) => {
				setCurrentUser(profile);
				setCards(initialCards);
			})
			.catch(err => console.log(`Ошибка: ${err}`));
	}, []);

	function handleEditAvatarClick() {
		setIsEditAvatarPopupOpened(true);
	};

	function handleEditProfileClick() {
		setIsEditProfilePopupOpened(true);
	};

	function handleAddPlaceClick() {
		setIsAddPlacePopupOpened(true);
	};

	function closeAllPopups() {
		setIsEditAvatarPopupOpened(false);
		setIsEditProfilePopupOpened(false);
		setIsAddPlacePopupOpened(false);
		setIsImagePopupOpened(false);
	}

	function handleCardLike(card) {
		const isLiked = card.likes.some(i => i._id === currentUser._id);
		api.changeLikeCardStatus(card._id, isLiked)
			.then((newCard) => {
				setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
			})
			.catch(err => console.log(`Ошибка: ${err}`))
	}

	function handleCardDelete(card) {
		const updatedCards = cards.filter(cardItem => cardItem._id !== card._id);
		api.deleteCard(card._id)
			.then(() => {
				setCards(updatedCards);
			})
			.catch(err => console.log(`Ошибка: ${err}`))
	}

	function handleUpdateUser(userInfo) {
		api.edtiProfile(userInfo.name, userInfo.about)
			.then((newUserInfo) => {
				setCurrentUser(newUserInfo);
				closeAllPopups();
			})
			.catch(err => console.log(`Ошибка: ${err}`))
	}

	function handleUpdateAvatar(avatar) {
		api.updateAvatar(avatar)
			.then((newUserInfo) => {
				setCurrentUser(newUserInfo);
				closeAllPopups();
			})
			.catch(err => console.log(`Ошибка: ${err}`))
	}

	function handleAddPlace({
		name,
		link
	}) {
		api.addCard(name, link)
			.then((newCard) => {
				setCards([newCard, ...cards]);
				closeAllPopups();
			})
			.catch(err => console.log(`Ошибка: ${err}`))
	}

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<DataCardsContext.Provider value={cards}>
				<div className="App">
					<Header
						loggedIn={loggedIn}
						userData={userData}
					/>
					<Main
						onEditAvatar={handleEditAvatarClick}
						onEditProfile={handleEditProfileClick}
						onAddPlace={handleAddPlaceClick}
						isImagePopupOpened={isImagePopupOpened}
						setIsImagePopupOpened={setIsImagePopupOpened}
						setSelectedCard={setSelectedCard}
						onCardLike={handleCardLike}
						onCardDelete={handleCardDelete}
						cards={cards}
					/>
					<Footer />
					<EditAvatarPopup
						isOpen={isEditAvatarPopupOpened}
						onClose={closeAllPopups}
						onUpdateAvatar={handleUpdateAvatar}
					/>
					<EditProfilePopup
						isOpen={isEditProfilePopupOpened}
						onClose={closeAllPopups}
						onUpdateUser={handleUpdateUser}
					/>
					<AddPlacePopup
						isOpen={isAddPlacePopupOpened}
						onClose={closeAllPopups}
						onAddPlace={handleAddPlace}
					/>
					<ImagePopup
						isOpen={isImagePopupOpened}
						card={selectedCard}
						onClose={closeAllPopups}
					/>
				</div>
			</DataCardsContext.Provider>
		</CurrentUserContext.Provider>
	)

}

export default Mesto;