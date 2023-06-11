import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({
	isOpen,
	onClose,
	onAddPlace
}) {
	const [newPlaceName, setNewPlaceName] = useState("");
	const [newPlaceLink, setNewPlaceLink] = useState("");

	useEffect(() => {
		setNewPlaceName("");
		setNewPlaceLink("");
	}, [isOpen]);

	function handleChangePlaceName(evt) {
		setNewPlaceName(evt.target.value);
	}

	function handleChangePlaceLink(evt) {
		setNewPlaceLink(evt.target.value);
	}

	function handleSubmit(evt) {
		evt.preventDefault();
		onAddPlace({
			name: newPlaceName,
			link: newPlaceLink
		});
	}

	return (
		<PopupWithForm
			title="Новое место"
			buttonText="Создать"
			onClose={onClose}
			isOpen={isOpen}
			onSubmit={handleSubmit}
			name="add-photo"
			children={
				<>
					<input
						className="popup__input-form"
						id="inputMestoName"
						name="mestoName"
						minLength="2"
						maxLength="30"
						placeholder="Название"
						required
						value={newPlaceName}
						onChange={handleChangePlaceName}
					/>
					<span
						id="inputMestoName-error"
						className="popup__error popup__error_visible"
					/>
					<input
						className="popup__input-form"
						type="url"
						id="inputMestoLink"
						name="mestoLink"
						placeholder="Ссылка на картинку"
						required
						value={newPlaceLink}
						onChange={handleChangePlaceLink}
					/>
					<span
						id="inputMestoLink-error"
						className="popup__error popup__error_visible"
					/>
				</>
			}
		/>
	)

}

export default AddPlacePopup;