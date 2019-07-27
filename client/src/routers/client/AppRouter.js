import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//@User
import DashBoard from '../../components/client/DashBoard';
import ClientRegister from '../../components/client/RegistrationForm';
import DepartmentRegister from '../../components/department/RegistrationForm';
import Header from '../../components/common/Header';
import NotFound from '../../components/common/NotFound';
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
          <PublicRouter exact={true} path="/" component={DashBoard} />
          <PrivateRouter path="/d/panel" component={DepartmentPanel} />
          <PrivateRouter path="/c/panel" component={ClientPanel} />
          <PublicRouter path="/d/signup" component={DepartmentRegister} />
          <PublicRouter path="/c/signup" component={ClientRegister} />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
