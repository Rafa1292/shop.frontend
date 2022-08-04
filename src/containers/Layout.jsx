import React, { useEffect, useContext, useState, useRef } from 'react';
import Header from '@components/Header';
import AppContext from '../context/AppContext';
import Loader from '@components/Loader';
import { usePatch } from '../hooks/useAPI';

const Layout = ({ children }) => {
	const { setRole } = useContext(AppContext);
	const [loader, setLoader] = useState(true);
	const { state, changeSeeMode } = useContext(AppContext);
	const phone = useRef(0);

	const addPhoneNumber = async () => {
		const response = await usePatch(`customers/${state.auth.sub}`, {phone: phone.current.value.toString()});

		if (!response.error) {
			await setRole();
		}
	}
	useEffect(async () => {
		try {
			const token = localStorage.getItem('token');
			if (token) {
				await setRole();
			}
			setLoader(false);

		} catch (error) {
			setLoader(false);
		}
	}, []);
	return (
		<div className="layout center">
			<Header />
			{
				!loader &&
				<>
					{
						(state.auth.phone > 0 || state.auth.justSee || state.auth.user == null) ?
							(
								children
							)
							:
							(
								<div className="col-10 center">
									<h4>Antes de continuar...</h4>
									<span className='col-8 center'>
										Puedes brindarnos tu numero de telefono?
									</span>
									<span className='col-10 my-2 center d-flex '>
										<input type="number" placeholder="Telefono" className="input" ref={phone} />
										<span className='my-2 center col-10'>
											<input type='button' className='btn success mx-2' value='Agregar' onClick={()=>addPhoneNumber()} />
										</span>
									</span>
									<small className='col-8 text-center center'>
										Esto con el fin de comunicarnos contigo en caso de realizar una compra para coordinar la  entrega  y demas detalles
									</small>
									<small className='col-8 text-center my-2 center'>
										ó puedes continuar viendo...
									</small>
									<span className=' center'>
										<input type='button' className='btn mx-2' value='Solo quiero ver' onClick={() => changeSeeMode()} />
									</span>
								</div>
							)
					}
				</>
				||
				<>
					<Loader />
				</>
			}
		</div>
	);
}

export default Layout;
