
import { useNavigate } from "react-router-dom";

function NavBar({
	userData,
	loggedIn,
	textNavBarLink,
	linkNavBar
}) {
	const navigate = useNavigate();

	function signOut() {
		localStorage.removeItem("jwt");
		navigate("/sign-in");
	}

	function signAll() {
		navigate(`${linkNavBar}`)
	}

	return (
		<>
			{loggedIn &&
				<div className="header__menu">
					<h2 className="header__login">{userData.email}</h2>
					<button onClick={signOut} className="header__link">Выйти</button>

				</div>}
			{!loggedIn &&
				<div className="header__menu">
					<button onClick={signAll} className="link header__link">{textNavBarLink}</button>
				</div>}
		</>
	)
}

export default NavBar;