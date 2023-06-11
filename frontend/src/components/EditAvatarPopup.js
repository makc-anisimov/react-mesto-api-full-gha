import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({
	isOpen,
	onClose,
	onUpdateAvatar
}) {

	const avatarLink = useRef();

	function handleSubmit(evt) {
		evt.preventDefault();
		onUpdateAvatar(avatarLink.current.value);
		avatarLink.current.value = "";
	}
	return (
		<PopupWithForm
			title="Обновить аватар"
			buttonText="Сохранить"
			onSubmit={handleSubmit}
			onClose={onClose}
			isOpen={isOpen}
			name="update-avatar"
			children={<>
				<input
					className="popup__input-form"
					type="url"
					id="inputAvatarLink"
					name="AvatarLink"
					placeholder="Ссылка на картинку"
					required
					ref={avatarLink}
				/>
				<span
					id="inputAvatarLink-error"
					className="popup__error popup__error_visible"
				/>
			</>}
		/>
	)
}

export default EditAvatarPopup;