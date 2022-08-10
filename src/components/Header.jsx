import React, { useState, useContext, useEffect } from 'react';
import '@styles/Header.scss';
import MyOrder from '../containers/MyOrder';
import logo_desatados from '@icons/logo_desatados.png';
import userblack from '@icons/userblack.png';
import AppContext from '../context/AppContext';
import shoppingCart from '@icons/icon_shopping_cart.svg';
import { Link } from "react-router-dom";
import close from '@icons/close.png';
import dotMenu from '@icons/dotMenu.png';
import logout from '@icons/logout.png';
import { useHistory } from "react-router-dom"
import Login from '@containers/Login'

const Header = () => {
	const history = useHistory();
	const [openStyle, setOpenStyle] = useState(false);
	const [openCartClass, setOpenCartClass] = useState('');
	const { state, resetAuthState } = useContext(AppContext);
	const [openMenu, setOpenMenu] = useState(false);
	const [openMenuClass, setOpenMenuClass] = useState('');
	const [openHambMenuClass, setOpenHambMenuClass] = useState('');


	const HandleMenu = (state) => {
		setOpenMenu(state);
		if (state) {
			setOpenMenuClass('open-login');
			setOpenHambMenuClass('hamb-menu-open');
			if (openStyle) {
				setOpenStyle(false);
				setOpenCartClass('close-cart');
			}
		}
		else {
			setOpenMenuClass('close-login');
			setOpenHambMenuClass('');
		}
	}

	const HandleCart = (state) => {
		setOpenStyle(state);
		if (state) {
			setOpenCartClass('open-cart');
			if (openMenu) {
				setOpenMenu(false);
				setOpenMenuClass('close-login');
				setOpenHambMenuClass('');
			}
		}
		else {
			setOpenCartClass('close-cart');
		}
	}

	const Home = () => {
		if (openStyle) {
			setOpenStyle(false);
			setOpenCartClass('close-cart');
		}

		if (openMenu) {
			setOpenMenu(false);
			setOpenMenuClass('close-login');
			setOpenHambMenuClass('');
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
		<>
			<nav className='z-10 center items-center'>

				<div className="dot-menu-container">
					{
						!state.auth.user &&
						<Link to={'/login'}>
							<img src={userblack} height='44' alt="menu" className={`menu hamb-menu-close `} />
						</Link>
						||
						<img onClick={()=> HandleMenu(!openMenu)} src={dotMenu} height='44' alt="menu" className={`menu hamb-menu-close ${openHambMenuClass}`} />
					}
				</div>

				<Link onClick={() => Home()} className='center mx-2 items-center'
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

				<div className={`flex-wrap login ${openMenuClass}`} >
					{state.auth.user &&
						<div className='col-10 my-2 flex-wrap center' style={{boxShadow: '0px 6px 10px -8px rgba(0,0,0,.3)'}}>
							<small className='center p-1 col-5 items-center flex-wrap' style={{ textAlign: 'left' }}>
								<strong className="col-10 center">
									Bienvenido
								<em className="col-10 center">
									{state.auth.user.substring(0, state.auth.user.indexOf('@'))}
								</em>
								</strong>
							</small>
							<small style={{ color: 'darkblue', justifyContent: 'flex-end' }} onClick={() => Logout()} className='p-2 d-flex col-5 hover'>
							<img  src={logout} height='40' style={{opacity: '0.8'}} alt="menu" />
							</small>
						</div>
						||
						<Login HandleMenu={HandleMenu} />
					}
					<div className="col-10 center" style={{ height: 'fit-content' }}>
						{state.auth.role == 'admin' &&
							<>
								<div className='col-10 dropdown-menu flex-wrap center'>
									Mantenimiento
									<div className="center col-10 dropdown-container">
										<ul  >
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
										</ul>
									</div>
								</div>
								<div className='col-10 dropdown-menu flex-wrap center'>
									Cuentas
									<div className="center col-10 dropdown-container">
										<ul>
											<li onClick={() => HandleMenu(false)}>
												<Link to="/accounts">Cuentas</Link>
											</li>
											<li onClick={() => HandleMenu(false)}>
												<Link className='d-flex' to="/paymethods">Metodos de pago</Link>
											</li>
											<li onClick={() => HandleMenu(false)}>
												<Link to="/payment/create">Agregar abono</Link>
											</li>
										</ul>
									</div>
								</div>
								<li className='col-10 center' onClick={() => HandleMenu(false)}>
									<Link to="/investments">Inversiones</Link>
								</li>
								<li className='col-10 center' onClick={() => HandleMenu(false)}>
									<Link to="/customers">Clientes</Link>
								</li>
								<li className='col-10 center' onClick={() => HandleMenu(false)}>
									<Link to={`/orders`}>Ordenes</Link>
								</li>
							</>}
						{state.auth.user &&
							<li className='col-10 center' onClick={() => HandleMenu(false)}>
								<Link to={`/orders/customer/${state.auth.sub}`}>Mis ordenes</Link>
							</li>
						}
					</div>
				</div>


			</nav>
		</>
	);
}

export default Header;
