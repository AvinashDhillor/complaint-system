import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//@User
import { DashBoard } from '../../components/client/DashBoard';
import ClientRegister from '../../components/client/RegistrationForm';
import DepartmentRegister from '../../components/department/RegistrationForm';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" component={DashBoard} exact={true} />
          <Route path="/d/signup" component={DepartmentRegister} exact={true} />
          <Route path="/c/signup" component={ClientRegister} exact={true} />
          <Route path="/login" component={DashBoard} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
