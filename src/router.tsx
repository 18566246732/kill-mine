import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Homepage } from "./components/Homepage";
import { Login } from "./components/Login";
import { Register } from "./components/Register";

export default () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Homepage />
                </Route>
                <Route exact path="/login">
                    <Login />
                </Route>
                <Route exact path="/register">
                    <Register />
                </Route>
            </Switch>
        </Router>
    )
}