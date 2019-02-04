import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Dashboard from "./components/dashboard/Dashboard";
import ManageMenu from "./components/menu/ManageMenu";
import MenuDetails from "./components/menu/MenuDetails";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import CreateMenu from "./components/menu/CreateMenu";
import CreateMenuItem from "./components/menu/CreateMenuItem";
import ManageUsers from "./components/manageUser/manageUsers";
import UserDetails from "./components/manageUser/userDetail";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/menus" component={ManageMenu} />
            <Route path="/menu/:id" component={MenuDetails} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/createmenu" component={CreateMenu} />
            <Route path="/createmenu/:id" component={CreateMenu} />
            <Route path="/createmnenuitem" component={CreateMenuItem} />
            <Route path="/manageusers" component={ManageUsers} />
            <Route path="/user/:id" component={UserDetails} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
