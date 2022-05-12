import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Layout from '@containers/Layout';
import Home from '@pages/Home';
import Login from '@pages/Login';
import PasswordRecovery from '@pages/PasswordRecovery';
import SendEmail from '@pages/SendEmail';
import NewPassword from '@pages/NewPassword';
import MyAccount from '@pages/MyAccount';
import CreateAccount from '@pages/CreateAccount';
import Checkout from '@pages/Checkout';
import Orders from '@pages/Orders';
import Products from '@pages/Products';
import CreateProduct from '@pages/CreateProduct';
import Categories from '@pages/Categories';
import Brands from '@pages/Brands';
import Colors from '@pages/Colors';
import Subcategories from '@pages/Subcategories';
import Sizes from '@pages/Sizes';
import States from '@pages/States';
import Accounts from '@pages/Accounts';
import Paymethods from '@pages/Paymethods';
import CreatePayment from '@pages/CreatePayment';
import Customers from '@pages/Customers';
import CustomerOrders from '@pages/CustomerOrders';
import Order from '@pages/Order';
import NotFound from '@pages/NotFound';
import AppContext from '../context/AppContext';
import useInitialState from '../hooks/useInitialState';
import '@styles/global.css';

const App = () => {
	const initialState = useInitialState();
	return (
		<AppContext.Provider value={initialState}>
			<BrowserRouter>
				<Layout>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/password-recovery" component={PasswordRecovery} />
						<Route exact path="/orders/customer/:customerId" component={CustomerOrders} />
						<Route exact path="/orders/:orderId" component={Order} />
						<Route exact path="/send-email" component={SendEmail} />
						<Route exact path="/new-password" component={NewPassword} />
						<Route exact path="/account" component={MyAccount} />
						<Route exact path="/signup" component={CreateAccount} />
						<Route exact path="/checkout" component={Checkout} />
						<Route exact path="/orders" component={Orders} />
						<Route exact path="/products" component={Products} />
						<Route exact path="/products/create" component={CreateProduct} />
						<Route exact path="/products/update/:productId" component={CreateProduct} />
						<Route exact path="/categories" component={Categories} />
						<Route exact path="/brands" component={Brands} />
						<Route exact path="/subcategories" component={Subcategories} />
						<Route exact path="/colors" component={Colors} />
						<Route exact path="/sizes" component={Sizes} />
						<Route exact path="/states" component={States} />
						<Route exact path="/accounts" component={Accounts} />
						<Route exact path="/paymethods" component={Paymethods} />
						<Route exact path="/payment/create" component={CreatePayment} />
						<Route exact path="/customers" component={Customers} />
						<Route path="*" component={NotFound} />
					</Switch>
				</Layout>
			</BrowserRouter>
		</AppContext.Provider>
	);
}

export default App;
