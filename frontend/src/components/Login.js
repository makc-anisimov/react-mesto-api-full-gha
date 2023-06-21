import { useState } from "react";
import Header from "./Header";
import InfoTooltip from "./InfoTooltip";

function Login({
	handleLogin,
	isInfoToolTipOpened,
	isInfoToolTipOk,
	setInfoToolTipOpened,
	setInfoToolTipOk,
	closeInfoToolTip,
}) {

	const [userData, setUserData] = useState({
		email: "",
		password: "",
	});

	function handleChange(e) {
		const { name, value } = e.target;
		setUserData({
			...userData,
			[name]: value,
		});
		// console.log('function handleChange userData:', userData);
	}

	function handleSubmit(evt) {
		evt.preventDefault();
		handleLogin(userData)
			.then(() => {
			})
			.catch((error) => {
				setInfoToolTipOk(false);
				setInfoToolTipOpened(true);
			});
	}

	return (
		<>
			<Header
				textNavBarLink="Регистрация"
				linkNavBar="/sign-up"
			/>
			<div className="sign">
				<form
					onSubmit={handleSubmit}
					className="sign__form"
				>
					<h2 className="sign__form-title">Вход</h2>
					<input
						onChange={handleChange}
						className="sign__input-form"
						type="email"
						name="email"
						placeholder="Email"
						required
					/>
					<input
						onChange={handleChange}
						className="sign__input-form"
						type="password"
						name="password"
						placeholder="Пароль"
						required
					/>
					<button
						className="sign__submit-button">
						Войти
					</button>
				</form>
			</div>
			<InfoTooltip
				isOpen={isInfoToolTipOpened}
				isOk={isInfoToolTipOk}
				onClose={closeInfoToolTip}
			/>

		</>
	)

}

export default Login;