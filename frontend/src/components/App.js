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
					localStorage.setItem("jwt", `${data.jwt}`);
					tokenCheck();
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