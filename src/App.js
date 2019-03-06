import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Header from "./components/layout/Header";
import Dashboard from "./components/dashboard/Dashboard";
import Notifications from "./components/dashboard/Notifications";
import ManageMenu from "./components/menu/ManageMenu";
import MenuDetails from "./components/menu/MenuDetails";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import CreateMenu from "./components/menu/CreateMenu";
import CreateMenuItem from "./components/menu/CreateMenuItem";
import ManageUsers from "./components/manageUser/manageUsers";
import ManageOrders from "./components/manageOrders/manageOrders";
import TrackYourOrders from "./components/manageOrders/tractYourOrders";
import ManageCart from "./components/manageCart/manageCart";
import UserDetails from "./components/manageUser/userDetail";
import AuthGaurd from "./components/auth/AuthGaurd";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App pb-4">
          <Header />
          <div className="content">
            <Switch>
              <Route exact path="/" component={AuthGaurd(Dashboard)} />
              <Route path="/orders" component={AuthGaurd(ManageOrders)} />
              <Route
                path="/your-orders"
                component={AuthGaurd(TrackYourOrders)}
              />
              <Route path="/cart" component={AuthGaurd(ManageCart)} />
              <Route path="/menus" component={AuthGaurd(ManageMenu)} />
              <Route path="/menu" component={MenuDetails} />
              <Route path="/menu/:id" component={MenuDetails} />
              <Route path="/signin" component={SignIn} />
              <Route path="/signup" component={SignUp} />
              <Route path="/createmenu" component={AuthGaurd(CreateMenu)} />
              <Route path="/createmenu/:id" component={AuthGaurd(CreateMenu)} />
              <Route
                path="/createmnenuitem"
                component={AuthGaurd(CreateMenuItem)}
              />
              <Route path="/manageusers" component={AuthGaurd(ManageUsers)} />
              <Route path="/user/:id" component={AuthGaurd(UserDetails)} />
            </Switch>
          </div>
          <Notifications />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
