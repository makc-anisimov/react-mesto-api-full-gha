import { useContext, useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function EditProfilePopup({
	isOpen,
	onClose,
	onUpdateUser
}) {

	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const currentUser = useContext(CurrentUserContext);

	useEffect(() => {
		setName(currentUser.name);
		setDescription(currentUser.about);
	}, [isOpen, currentUser]);

	function handleChangeName(evt) {
		setName(evt.target.value);
	}

	function handleChangeDescription(evt) {
		setDescription(evt.target.value);
	}

	function handleSubmit(evt) {
		evt.preventDefault();
		onUpdateUser({
			name,
			about: description
		});
	}

	return (
		<PopupWithForm
			title="Редактировать профиль"
			buttonText="Сохранить"
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
			name="profile-edit"
			children={<>
				<input
					value={name || ""}
					onChange={handleChangeName}
					className="popup__input-form"
					id="inputName"
					name="profileName"
					minLength="2"
					maxLength="40"
					placeholder="Имя"
					required
				/>
				<span
					id="inputName-error"
					className="popup__error popup__error_visible"
				/>
				<input
					value={description || ""}
					onChange={handleChangeDescription}
					className="popup__input-form"
					id="inputJob"
					name="profileJob"
					minLength="2"
					maxLength="200"
					placeholder="О себе"
					required
				/>
				<span
					id="inputJob-error"
					className="popup__error popup__error_visible"
				/>
			</>}
		/>
	)
}

export default EditProfilePopup;