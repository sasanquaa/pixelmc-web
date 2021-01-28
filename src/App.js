import "antd/dist/antd.css";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch, browserHistory, IndexRedirect } from "react-router-dom";
import IndexPage from "./pages/index";
import ChargePage from "./pages/charge";
import store from "./redux/store";

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={IndexPage}></Route>
					<Route exact path="/napthe" component={ChargePage}></Route>
				</Switch>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
