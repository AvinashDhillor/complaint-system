import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//@User
import DashBoard from '../../components/client/DashBoard';
import ClientRegister from '../../components/client/RegistrationForm';
import DepartmentRegister from '../../components/department/RegistrationForm';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import ClientPanel from '../../components/client/Panel';
import DepartmentPanel from '../../components/department/Panel';
import PrivateRouter from './PrivateRouter';
import PublicRouter from './PublicRouter';

const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact={true} path="/" component={DashBoard} />
          <Route path="/d/panel" component={DepartmentPanel} />
          <Route path="/c/panel" component={ClientPanel} />
          <Route path="/d/signup" component={DepartmentRegister} />
          <Route path="/c/signup" component={ClientRegister} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
