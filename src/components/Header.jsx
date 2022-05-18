import React, { useState, useContext, useEffect } from 'react';
import '@styles/Header.scss';
import MyOrder from '../containers/MyOrder';
import logo from '@logos/desatados.png';
import AppContext from '../context/AppContext';
import shoppingCart from '@icons/icon_shopping_cart.svg';
import { Link } from "react-router-dom";
import close from '@icons/close.png';
import dotMenu from '@icons/dotMenu.png';
import { useHistory } from "react-router-dom"

const Header = () => {
	const history = useHistory();
	const [openStyle, setOpenStyle] = useState(false);
	const [openStyleClass, setOpenStyleClass] = useState({});
	const { state, resetAuthState } = useContext(AppContext);
	const [openMenu, setOpenMenu] = useState(false);
	const [openMenuClass, setOpenMenuClass] = useState('');
	const [openHambMenuClass, setOpenHambMenuClass] = useState('');
	const handleToggle = () => {
		setToggle(!toggle);
	}

	const HandleMenu = (state) => {
		setOpenMenu(state);
		if (state) {
			setOpenMenuClass('open-menu');
			setOpenHambMenuClass('hamb-menu-open');
		}
		else {
			setOpenMenuClass('');
			setOpenHambMenuClass('');
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

	const Logout = async () => {
		localStorage.removeItem('token');
		document.cookie = 'token=0';
		HandleMenu(false);
		resetAuthState();
		history.push('/');
	}

	const getUser = async () => {
		try {
			var cookies = document.cookie;
			cookies = cookies.split(';')
			for (const cookie of cookies) {
				if (cookie.includes('token')) {
					const token = cookie.split('=')[1];
					if(token != 0){
						localStorage.setItem('token', token);
					}
				}
			}
		} catch (error) {

		}

	}
	useEffect(async () => {
		await getUser();
	}, []);

	return (
		<nav className='z-10 items-center'>
			<img src={dotMenu} height='44' alt="menu" className={`menu hamb-menu-close ${openHambMenuClass}`} onClick={() => HandleMenu(!openMenu)} />
			<div className="navbar-left">
				<Link to='/'>
					<img src={logo} alt="logo" className="nav-logo" />
				</Link>
				<ul className={openMenuClass}>
					<li onClick={() => HandleMenu(false)}>
						{state.auth.user &&
							<div className='col-10 flex-wrap center'>
								<small className='center' style={{ textAlign: 'center' }}> Bienvenido {state.auth.user}</small>
							</div>
							||
							<Link to="/login">Login</Link>
						}
					</li>
					{state.auth.role == 'admin' &&
						<>
							<li onClick={() => HandleMenu(false)}>
								<Link to="/payment/create">Agregar abono</Link>
							</li>
							<li onClick={() => HandleMenu(false)}>
								<Link to="/categories">Categorias</Link>
							</li>
							<li onClick={() => HandleMenu(false)}>
								<Link to="/subCategories">Subcategorias</Link>
							</li>
							<li onClick={() => HandleMenu(false)}>
								<Link to="/brands">Marcas</Link>
							</li>
							<li onClick={() => HandleMenu(false)}>
								<Link to="/colors">Colores</Link>
							</li>
							<li onClick={() => HandleMenu(false)}>
								<Link to="/products">Productos</Link>
							</li>
							<li onClick={() => HandleMenu(false)}>
								<Link to="/sizes">Tamaños</Link>
							</li>
							<li onClick={() => HandleMenu(false)}>
								<Link to="/accounts">Cuentas</Link>
							</li>
							<li onClick={() => HandleMenu(false)}>
								<Link to="/states">Estados</Link>
							</li>
							<li onClick={() => HandleMenu(false)}>
								<Link to="/customers">Clientes</Link>
							</li>
							<li onClick={() => HandleMenu(false)}>
								<Link to="/orders/customer/5">Mis ordenes</Link>
							</li>
						</>}
					<li className='secondary center' onClick={() => Logout()}>
						<span className='p-1'>Salir</span>
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
						<img height={38} src={shoppingCart} alt="shopping cart" />
						{state.items.length > 0 ? <div>{state.items.length}</div> : null}
					</li>
				</ul>
			</div>
			<div className="MyOrder" style={openStyleClass}>
				<img height={30} className="z-10" style={{ opacity: 0.6, position: "absolute" }} src={close} onClick={() => HandleCart(!openStyle)} />
				<MyOrder />
			</div>
		</nav>
	);
}

export default Header;
