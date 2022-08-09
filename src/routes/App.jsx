import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Layout from '@containers/Layout';
import Home from '@pages/Home';
import Login from '@pages/Login';
import Orders from '@pages/Orders';
import Products from '@pages/Products';
import CreateProduct from '@pages/CreateProduct';
import Categories from '@pages/Categories';
import Brands from '@pages/Brands';
import Colors from '@pages/Colors';
import Subcategories from '@pages/SubCategories';
import PasswordRecovery from '@pages/PasswordRecovery';
import Sizes from '@pages/Sizes';
import States from '@pages/States';
import Accounts from '@pages/Accounts';
import Register from '@pages/Register';
import AccountDetails from '@pages/AccountDetails';
import Paymethods from '@pages/Paymethods';
import CreatePayment from '@pages/CreatePayment';
import Customers from '@pages/Customers';
import CustomerOrders from '@pages/CustomerOrders';
import Order from '@pages/Order';
import NewPassword from '@pages/NewPassword';
import Investments from '@pages/Investments';
import CreateInvestment from '@pages/CreateInvestment';
import InvestmentDetail from '@pages/InvestmentDetail';
import SendEmail from '@pages/SendEmail';
import PrivacyPolicy from '@pages/PrivacyPolicy';
import Inventory from '@pages/Inventory';
import DeleteMyData from '@pages/DeleteMyData';
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
						<Route exact path="/login" component={Login} />
						<Route exact path="/privacy-policy" component={PrivacyPolicy} />
						<Route exact path="/delete-my-data" component={DeleteMyData} />
						<Route exact path="/register" component={Register} />
						<Route exact path="/password-recovery" component={PasswordRecovery} />
						<Route exact path="/new-password/:token" component={NewPassword} />
						<Route exact path="/orders/customer/:customerId" component={CustomerOrders} />
						<Route exact path="/orders/:orderId" component={Order} />
						<Route exact path="/orders" component={Orders} />
						<Route exact path="/products" component={Products} />
						<Route exact path="/send-email" component={SendEmail} />
						<Route exact path="/products/create" component={CreateProduct} />
						<Route exact path="/products/update/:productId" component={CreateProduct} />
						<Route exact path="/categories" component={Categories} />
						<Route exact path="/brands" component={Brands} />
						<Route exact path="/subcategories" component={Subcategories} />
						<Route exact path="/colors" component={Colors} />
						<Route exact path="/sizes" component={Sizes} />
						<Route exact path="/states" component={States} />
						<Route exact path="/accounts" component={Accounts} />
						<Route exact path="/accounts/:accountId" component={AccountDetails} />
						<Route exact path="/paymethods" component={Paymethods} />
						<Route exact path="/payment/create" component={CreatePayment} />
						<Route exact path="/customers" component={Customers} />
						<Route exact path="/investments" component={Investments} />
						<Route exact path="/inventory" component={Inventory} />
						<Route exact path="/investments/create" component={CreateInvestment} />
						<Route exact path="/investments/:investmentId" component={InvestmentDetail} />
						<Route exact path="/:token?" component={Home} />
						<Route path="*" component={NotFound} />
					</Switch>
				</Layout>
			</BrowserRouter>
		</AppContext.Provider>
	);
}

export default App;
