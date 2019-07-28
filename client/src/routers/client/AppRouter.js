import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//@User
import DashBoard from '../../components/client/DashBoard';
import ClientRegister from '../../components/client/RegistrationForm';
import DepartmentRegister from '../../components/department/RegistrationForm';
import Header from '../../components/common/Header';
import NotFound from '../../components/common/NotFound';
import Footer from '../../components/common/Footer';
import CreateComplaint from '../../components/client/CreateComplaint';
import Pending from '../../components/client/Pending';
import Rejected from '../../components/client/Rejected';
import AllComplaints from '../../components/department/AllComplaints';
import PrivateRouter from './PrivateRouter';
import PublicRouter from './PublicRouter';

const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Switch>
          <PublicRouter exact={true} path="/" component={DashBoard} />
          <PrivateRouter
            path="/d/panel/allcomplaints"
            component={AllComplaints}
          />
          {/* <PrivateRouter
            path="/c/panel/complaint"
            component={CreateComplaint}
          /> */}
          <PrivateRouter
            path="/c/panel/complaint"
            component={CreateComplaint}
            exact={true}
          />
          <PrivateRouter
            path="/c/panel/complaint/pending"
            component={Pending}
            exact={true}
          />
          <PrivateRouter
            path="/c/panel/complaint/rejected"
            component={Rejected}
            exact={true}
          />
          <PublicRouter path="/d/signup" component={DepartmentRegister} />
          <PublicRouter path="/c/signup" component={ClientRegister} />
          <Route component={NotFound} />
        </Switch>
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
