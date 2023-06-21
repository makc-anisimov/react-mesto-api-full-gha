import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Mesto from './Mesto';
import Login from './Login';
import Register from './Register';
import { userAuth } from '../utils/UserAuth';

function App() {

	const navigate = useNavigate();
	const [isInfoToolTipOpened, setInfoToolTipOpened] = useState(false);
	const [isInfoToolTipOk, setInfoToolTipOk] = useState(false);
	const [loggedIn, setLoggedIn] = useState(false);
	const [userData, setUserData] = useState({ email: "" });

	useEffect(() => {
		// setToken();
		tokenCheck();
	}, []);

	function tokenCheck() {
		const jwt = localStorage.getItem("jwt");
		if (jwt) {
			userAuth.setHeader({ name: "Authorization", value: `Bearer ${jwt}` });
			userAuth.getUserInfo()
				.then((userInfo) => {
					setLoggedIn(true);
					setUserData(userInfo);
					navigate("/");
				})
				.catch(err => console.log(`Ошибка: ${err}`));
		}
	}
	function handleLogin({ email, password }) {
		return userAuth.authorize({ email, password })
			.then((data) => {
				if (data.jwt) {
					// console.log('handleLogin data.jwt ', data.jwt);
					localStorage.setItem("jwt", `${data.jwt}`);
					tokenCheck();
					// userAuth.setHeader({ name: "Authorization", value: `Bearer ${data.jwt}` });
					// setLoggedIn(true);
					// setUserData(data.user);
					// navigate("/");
				}
			})
			.catch(err => console.log(`Ошибка: ${err}`));
	}

	function handleRegister({ email, password }) {
		return userAuth.register(email, password)
			.then(() => {
				setInfoToolTipOk(true);
				setInfoToolTipOpened(true);
				navigate("/sign-in");
			})
			.catch((err) => {
				setInfoToolTipOk(false);
				setInfoToolTipOpened(true);
				console.log('Ошибка:', err);
			});
	}

	// function setUserInfo() {
	// 	// const jwt = localStorage.getItem("jwt");
	// 		userAuth.getUserInfo()
	// 			.then((userInfo) => {
	// 				// console.log('userInfo', userInfo);
	// 				// setLoggedIn(true);
	// 				// setUserData(userInfo);
	// 				// navigate("/");
	// 			})
	// 			.catch(err => console.log(`Ошибка: ${err}`));
	// }

	// function setToken() {
	// 	const jwt = localStorage.getItem("jwt");
	// 	if (jwt) {
	// 		userAuth.setHeader({ name: "Authorization", value: `Bearer ${jwt}` });

	// 		userAuth.getUserInfo()
	// 			.then((userData) => {
	// 				console.log('userData', userData);
	// 				// setLoggedIn(true);
	// 				// setUserData(userData);
	// 				// navigate("/");
	// 			})
	// 			.catch(err => console.log(`Ошибка: ${err}`));
	// 		// navigate("/");
	// 	}
	// }

	function closeInfoToolTip() {
		setInfoToolTipOpened(false);
	}

	return (
		<Routes>
			<Route
				path="/"
				element={
					<ProtectedRoute
						loggedIn={loggedIn}
						userData={userData}
						component={Mesto}
					/>
				}
			/>
			<Route
				path="/sign-in"
				element={<Login
					handleLogin={handleLogin}
					isInfoToolTipOpened={isInfoToolTipOpened}
					setInfoToolTipOpened={setInfoToolTipOpened}
					closeInfoToolTip={closeInfoToolTip}
					isInfoToolTipOk={isInfoToolTipOk}
					setInfoToolTipOk={setInfoToolTipOk}
					loggedIn={loggedIn}
				/>}
			/>
			<Route
				path="/sign-up"
				element={<Register
					handleRegister={handleRegister}
					isInfoToolTipOpened={isInfoToolTipOpened}
					setInfoToolTipOpened={setInfoToolTipOpened}
					isInfoToolTipOk={isInfoToolTipOk}
					setInfoToolTipOk={setInfoToolTipOk}
					closeInfoToolTip={closeInfoToolTip}
					loggedIn={loggedIn}
				/>}
			/>
			<Route
				path="*"
				element={loggedIn
					? <Navigate to="/" />
					: <Navigate to="/sign-in" />
				}
			/>
		</Routes>
	);
}
export default App;