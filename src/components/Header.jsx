import React, { useState, useContext, useEffect } from 'react';
import '@styles/Header.scss';
import MyOrder from '../containers/MyOrder';
import logo_desatados from '@icons/logo_desatados.png';
import AppContext from '../context/AppContext';
import shoppingCart from '@icons/icon_shopping_cart.svg';
import userwhite from '@icons/userwhite.png';
import { Link } from "react-router-dom";
import close from '@icons/close.png';
import dotMenu from '@icons/dotMenu.png';
import { useHistory } from "react-router-dom"
import Login from '@containers/Login'

const Header = () => {
	const history = useHistory();
	const [openStyle, setOpenStyle] = useState(false);
	const [openStyleClass, setOpenStyleClass] = useState({});
	const { state, resetAuthState } = useContext(AppContext);
	const [openMenu, setOpenMenu] = useState(false);
	const [openMenuClass, setOpenMenuClass] = useState('close-login');
	const [openHambMenuClass, setOpenHambMenuClass] = useState('');


	const HandleMenu = (state) => {
		setOpenMenu(state);
		if (state) {
			setOpenMenuClass('open-login');
			setOpenHambMenuClass('hamb-menu-open');
		}
		else {
			setOpenMenuClass('close-login');
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
					if (token != 0) {
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
		<nav className='z-10 center items-center'>

			<div className="dot-menu-container">
			<img src={dotMenu} height='44' alt="menu" className={`menu hamb-menu-close ${openHambMenuClass}`} onClick={() => HandleMenu(!openMenu)} />
			</div>

			<Link className='center mx-2 items-center'
				style={{
					zIndex: '100',
					background: 'white',
					borderRadius: '90px',
					overflow: 'hidden',
					height: '100px',
					width: '100px',
					boxShadow: '0px 5px 6px -2px rgba(0,0,0,.4)'
				}} to='/'>
				<img src={logo_desatados} alt="logo" className="nav-logo" />
			</Link>

			<div
				className="navbar-shopping-cart"
				onClick={() => HandleCart(!openStyle)}
			>
				<img height={38} src={shoppingCart} alt="shopping cart" />
				{state.items.length > 0 ? <div>{state.items.length}</div> : null}
			</div>

			<div className="navbar-left">
				<ul className={`login ${openMenuClass}`} >
					<li onClick={() => HandleMenu(false)}>
						{state.auth.user &&
							<div className='col-10 flex-wrap center'>
								<small className='center' style={{ textAlign: 'center' }}>
									<strong className="col-10 center">
										Bienvenido
									</strong>
									<em className="col-10 center">
										{state.auth.user.substring(0, state.auth.user.indexOf('@'))}
									</em>
								</small>
								<small style={{ color: 'darkblue' }} onClick={() => Logout()} className='p-1 hover'>
									Salir
								</small>
							</div>
							||
							<Login/>
						}
					</li>
					{state.auth.role == 'admin' &&
						<>
							<div className='dropdown'>
								Mantenimiento
								<div className="center col-12 dropdown-content">
									<li onClick={() => HandleMenu(false)}>
										<Link to="/categories">Categorias</Link>
									</li>
									<li onClick={() => HandleMenu(false)}>
										<Link to="/subCategories">Subcategorias</Link>
									</li>
									<li onClick={() => HandleMenu(false)}>
										<Link to="/states">Estados</Link>
									</li>

									<li onClick={() => HandleMenu(false)}>
										<Link to="/sizes">Tamaños</Link>
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
								</div>
							</div>
							<div className='dropdown'>
								Cuentas
								<div className="center col-12 dropdown-content">
									<li onClick={() => HandleMenu(false)}>
										<Link to="/accounts">Cuentas</Link>
									</li>
									<li onClick={() => HandleMenu(false)}>
										<Link className='d-flex' to="/paymethods">Metodos de pago</Link>
									</li>
									<li onClick={() => HandleMenu(false)}>
										<Link to="/payment/create">Agregar abono</Link>
									</li>
								</div>
							</div>
							<li onClick={() => HandleMenu(false)}>
								<Link to="/investments">Inversiones</Link>
							</li>
							<li onClick={() => HandleMenu(false)}>
								<Link to="/customers">Clientes</Link>
							</li>
							<li onClick={() => HandleMenu(false)}>
								<Link to={`/orders`}>Ordenes</Link>
							</li>
						</>}
					{state.auth.user &&
						<li onClick={() => HandleMenu(false)}>
							<Link to={`/orders/customer/${state.auth.sub}`}>Mis ordenes</Link>
						</li>
					}
				</ul>
			</div>

			<div className="MyOrder" style={openStyleClass}>
				<img height={30} className="z-10" style={{ opacity: 0.6, position: "absolute" }} src={close} onClick={() => HandleCart(!openStyle)} />
				<MyOrder HandleCart={HandleCart} />
			</div>
		</nav>
	);
}

export default Header;
