import logo from '../images/logo.svg';
import NavBar from './NavBar';

function Header({
	linkNavBar,
	textNavBarLink,
	loggedIn,
	userData
}) {
	return (
		<header className="header">
			<img
				className="header__logo"
				src={logo}
				alt="логотип сервиса Место"
			/>
			<NavBar
				loggedIn={loggedIn}
				textNavBarLink={textNavBarLink}
				linkNavBar={linkNavBar}
				userData={userData}
			/>
		</header>
	)
}

export default Header;