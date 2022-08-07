import React, {useEffect, useContext} from 'react';
import ProductList from '@containers/ProductList';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from "react-router-dom"
import AppContext from '../context/AppContext';
const Home = () => {
	const { token } = useParams();
    const history = useHistory();
    const { setRole } = useContext(AppContext);
	
	useEffect(async () => {
		if (token) {
			console.log(token)
			let tempToken = token;
			do {
				tempToken = tempToken.replace("-", ".");
			  } while (tempToken.includes("-"));
			  localStorage.removeItem('token');
			  localStorage.setItem('token', tempToken);
			  await setRole();
			  history.push('/');
		}
    }, [])
	return (
		<>
			<ProductList />
		</>
	);
}

export default Home;
