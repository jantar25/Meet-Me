import React from 'react';
import {BrowserRouter as Router,Route, Switch } from "react-router-dom";
import AuthProvider from './Contex/Auth';
import Home from './Pages/Home/Home';
import Chats from "./Pages/Chats/Chats";
import IndividualChat from "./Pages/Individual_Chat/IndividualChat";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import PrivateRoutes from './config/PrivateRoutes';

const App:React.FunctionComponent<{}> = () => {
  return (
    <AuthProvider>
      <Router >
        <Switch>
          <PrivateRoutes exact path='/' component={Home} />
          <PrivateRoutes exact path='/chats' component={Chats} />
          <PrivateRoutes exact path='/chats/:person' component={IndividualChat} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
