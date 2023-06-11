
import { useNavigate } from "react-router-dom";

function NavBar({
	userData,
	loggedIn,
	textNavBarLink,
	linkNavBar
}) {
	const navigate = useNavigate();

	function signOut() {
		localStorage.removeItem("token");
		navigate("/sign-in");
	}

	function signAll() {
		navigate(`${linkNavBar}`)
	}

	return (
		<>
			{loggedIn &&
				<div className="header__menu">
					<h2 className="header__login">{userData}</h2>
					<button onClick={signOut} className="link header__link">Выйти</button>

				</div>}
			{!loggedIn &&
				<div className="header__menu">
					<button onClick={signAll} className="link header__link">{textNavBarLink}</button>
				</div>}
		</>
	)
}

export default NavBar;