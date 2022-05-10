import React, { useState, useContext } from 'react';
import '@styles/Header.scss';
import MyOrder from '../containers/MyOrder';
import menu from '@icons/icon_menu.svg';
import logo from '@logos/desatados.png';
import AppContext from '../context/AppContext';
import shoppingCart from '@icons/icon_shopping_cart.svg';
import { Link } from "react-router-dom";
import close from '@icons/close.png'

const Header = () => {
	const [openStyle, setOpenStyle] = useState(false);
	const [openStyleClass, setOpenStyleClass] = useState({});
	const { state } = useContext(AppContext);
	const [openMenu, setOpenMenu] = useState(false);
	const [openMenuClass, setOpenMenuClass] = useState('');
	const handleToggle = () => {
		setToggle(!toggle);
	}

	const HandleMenu = (state) => {
		setOpenMenu(state);
		if (state) {
			setOpenMenuClass('open-menu');
		}
		else {
			setOpenMenuClass('');
		}
	}

	const HandleCart = (state) => {
		setOpenStyle(state);
		if (state) {
			setOpenStyleClass({ right: 0 });
		}
		else {
			setOpenStyleClass({});
		}
	}

	return (
		<nav className='z-10'>
			<img src={menu} alt="menu" className="menu" onClick={() => HandleMenu(!openMenu)} />
			<div className="navbar-left">
				<Link to='/'>
					<img src={logo} alt="logo" className="nav-logo" />
				</Link>
				<ul className={openMenuClass}>
					<li>
						<Link to="/categories">Categorias</Link>
					</li>
					<li>
						<Link to="/subCategories">Subcategorias</Link>
					</li>
					<li>
						<Link to="/brands">Marcas</Link>
					</li>
					<li>
						<Link to="/colors">Colores</Link>
					</li>
					<li>
						<Link to="/products">Productos</Link>
					</li>
					<li>
						<Link to="/sizes">Tamaños</Link>
					</li>
					<li>
						<Link to="/accounts">Cuentas</Link>
					</li>
					<li>
						<Link to="/states">Estados</Link>
					</li>
					<li>
						<Link to="/customers">Clientes</Link>
					</li>
					<li>
						<Link to="/orders/customer/5">Mis ordenes</Link>
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
						onClick={() => HandleCart(!openStyle)}
					>
						<img src={shoppingCart} alt="shopping cart" />
						{state.items.length > 0 ? <div>{state.items.length}</div> : null}
					</li>
				</ul>
			</div>
			<div className="MyOrder" style={openStyleClass}>
				<img height={30} className="z-10" style={{opacity: 0.6, position: "absolute"}} src={close} onClick={() => HandleCart(!openStyle)}/>
				<MyOrder  />
			</div>
		</nav>
	);
}

export default Header;
