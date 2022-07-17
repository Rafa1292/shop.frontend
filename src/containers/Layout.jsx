import React, { useEffect, useContext, useState } from 'react';
import Header from '@components/Header';
import AppContext from '../context/AppContext';
import Loader from '@components/Loader';

const Layout = ({ children }) => {
	const { setRole } = useContext(AppContext);
	const [loader, setLoader] = useState(true);

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
					{children}
				</>
				||
				<>
				<Loader/>
				</>
			}
		</div>
	);
}

export default Layout;
