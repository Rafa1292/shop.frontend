import React, { useEffect, useContext } from 'react';
import Header from '@components/Header';
import AppContext from '../context/AppContext';

const Layout = ({ children }) => {
	const { setRole } = useContext(AppContext);

	useEffect(async () => {
		const token = localStorage.getItem('token');
		if (token) {
			await setRole();
		}
	}, []);
	return (
		<div className="layout center">
			<Header />
			{children}
		</div>
	);
}

export default Layout;
