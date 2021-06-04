import React from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import Home from './components/Home';
import Search from './components/Search';
import Table from './components/Table';
const App = () => {
    return (
        <BrowserRouter>
        <Switch>
        <Route exact path="/search" component={Search} />
        <Route path="/" component={Home} />
      </Switch>
      </BrowserRouter>

    );
  };
  export default App;