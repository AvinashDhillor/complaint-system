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
import CPending from '../../components/client/Pending';
import CResolved from '../../components/client/Resolved';
import DPending from '../../components/department/Pending';
import DResolved from '../../components/department/Resolved';
import Rejected from '../../components/client/Rejected';
import AllResolved from '../../components/department/AllResolved';
import PrivateRouter from './PrivateRouter';
import PublicRouter from './PublicRouter';
import Departments from '../../components/admin/Departments';
import Members from '../../components/admin/Members';
import Users from '../../components/admin/Users';
import ShowAdmins from '../../components/admin/ShowAdmins';
import AdminRegister from '../../components/admin/AdminRegister';
import Complaints from '../../components/admin/Complaints';

const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Switch>
          <PublicRouter exact={true} path="/" component={DashBoard} />

          {/*Admin */}
          <PrivateRouter
            path="/a/panel/departments"
            component={Departments}
            exact
          />
          <PrivateRouter path="/a/panel/members" component={Members} exact />
          <PrivateRouter path="/a/panel/users" component={Users} exact />
          <PrivateRouter
            path="/a/panel/show/admins"
            component={ShowAdmins}
            exact
          />
          <PrivateRouter
            path="/a/panel/register"
            component={AdminRegister}
            exact
          />
          <PrivateRouter
            path="/a/panel/complaints"
            component={Complaints}
            exact
          />

          {/* Department */}
          <PrivateRouter path="/d/panel/allresolved" component={AllResolved} />
          <PrivateRouter path="/d/panel/pending" component={DPending} exact />
          <PublicRouter path="/d/signup" component={DepartmentRegister} />
          <PrivateRouter
            path="/d/panel/resolved"
            component={DResolved}
            exact={true}
          />

          {/* Client */}
          <PublicRouter path="/c/signup" component={ClientRegister} />
          <PrivateRouter
            path="/c/panel/complaint"
            component={CreateComplaint}
            exact={true}
          />
          <PrivateRouter
            path="/c/panel/complaint/pending"
            component={CPending}
            exact={true}
          />
          <PrivateRouter
            path="/c/panel/complaint/rejected"
            component={Rejected}
            exact={true}
          />
          <PrivateRouter path="/c/panel/resolved" component={CResolved} exact />
          <Route component={NotFound} />
        </Switch>
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
