import React from 'react';
import Header from '@components/Header';

const Layout = ({ children }) => {
	return (
		<div className="layout center">
			<Header />
			{children}
		</div>
	);
}

export default Layout;
