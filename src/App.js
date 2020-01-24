import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { AuthProvider } from "./context/auth-context";

import { Home } from "./pages/Home";
import { AccountActivate } from "./pages/AccountActivate";
import { AccountCreate } from "./pages/AccountCreate";
import { AccountLogin } from "./pages/AccountLogin";
import { AccountPasswordChange } from "./pages/AccountPasswordChange";
import { AccountPasswordRecovery } from "./pages/AccountPasswordRecovery";
import { AdvancedSearch } from "./pages/AdvancedSearch";
import { Company } from "./pages/Company";
import { CompanyCreate } from "./pages/CompanyCreate";
import { EmailActivationRecovery } from "./pages/EmailActivationRecovery";
import { ReviewCreate } from "./pages/ReviewCreate";
import { ReviewUser } from "./pages/ReviewUser";
import { UserUpdate } from "./pages/UserUpdate";
import { UserDelete } from "./pages/UserDelete";
import { LinksTemporal } from "./pages/LinksTemporal";
import { NotFound } from "./pages/NotFound";

import { PrivateRoute } from './components/PrivateRoute';



function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <AuthProvider>
          <Switch>
            <Route exact path="/">
              <LinksTemporal />
            </Route>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route path="/account/activate/:verification_code">
              <AccountActivate />
            </Route>
            <Route path="/account/create">
              <AccountCreate />
            </Route>
            <Route path="/account/login">
              <AccountLogin />
            </Route>
            <PrivateRoute path="/account/password/change" allowedRoles={['1', '2']}>
              <AccountPasswordChange />
            </PrivateRoute>
            <Route path="/account/password/recovery">
              <AccountPasswordRecovery />
            </Route>
            <Route path="/advanced-search">
              <AdvancedSearch />
            </Route>
            <Route path="/company/detail">
              <Company />
            </Route>
            <PrivateRoute exact path="/company/create" allowedRoles={['2']} >
              <CompanyCreate />
            </PrivateRoute>
            <Route path="/email/activation/recovery">
              <EmailActivationRecovery />
            </Route>
            <PrivateRoute path="/review/create" allowedRoles={['1']} >
              <ReviewCreate />
            </PrivateRoute>
            <PrivateRoute path="/review/user" allowedRoles={['1']} >
              <ReviewUser />
            </PrivateRoute>
            <PrivateRoute path="/user/update" allowedRoles={['1', '2']} >
              <UserUpdate />
            </PrivateRoute>
            <PrivateRoute path="/user/delete" allowedRoles={['1', '2']} >
              <UserDelete />
            </PrivateRoute>
            <Route path="/not-found">
              <NotFound />
            </Route>
            <Route path="*">
              <Redirect to="/not-found" />
            </Route>
          </Switch>
        </AuthProvider>
      </BrowserRouter>
    </I18nextProvider>
  );
}

export default App;
