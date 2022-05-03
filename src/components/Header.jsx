import React, { useState, useContext } from 'react';
import '@styles/Header.scss';
import Menu from '@components/Menu';
import MyOrder from '../containers/MyOrder';
import menu from '@icons/icon_menu.svg';
import logo from '@logos/desatados.png';
import AppContext from '../context/AppContext';
import shoppingCart from '@icons/icon_shopping_cart.svg';

const Header = () => {
	const [toggle, setToggle] = useState(false);
	const [toggleOrders, setToggleOrders] = useState(false);
	const { state } = useContext(AppContext);

	const handleToggle = () => {
		setToggle(!toggle);
	}

	return (
		<nav>
			<img src={menu} alt="menu" className="menu" />
			<div className="navbar-left">
				<a href='/'>
					<img src={logo} alt="logo" className="nav-logo" />
				</a>
				<ul>
					<li>
						<a href="/categories">Categorias</a>
					</li>
					<li>
						<a href="/subCategories">Subcategorias</a>
					</li>
					<li>
						<a href="/brands">Marcas</a>
					</li>
					<li>
						<a href="/colors">Colores</a>
					</li>
					<li>
						<a href="/products">Productos</a>
					</li>
					<li>
						<a href="/sizes">Tamaños</a>
					</li>
					<li>
						<a href="/accounts">Cuentas</a>
					</li>
					<li>
						<a href="/states">Estados</a>
					</li>
				</ul>
			</div>
			<div className="navbar-right">
				<ul>
					<li className="navbar-email" onClick={handleToggle}>
						Hola Rafa!
					</li>
					<li
						className="navbar-shopping-cart"
						onClick={() => setToggleOrders(!toggleOrders)}
					>
						<img src={shoppingCart} alt="shopping cart" />
						{state.cart.length > 0 ? <div>{state.cart.length}</div> : null}
					</li>
				</ul>
			</div>
			{toggle && <Menu />}
			{toggleOrders && <MyOrder />}
		</nav>
	);
}

export default Header;
