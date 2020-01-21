import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { ReProvider } from "./context/app-context";

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
import { ReviewView } from "./pages/ReviewView";
import { UserUpdate } from "./pages/UserUpdate";
import { UserDelete } from "./pages/UserDelete";
import { LinksTemporal } from "./pages/LinksTemporal";
import { NotFound } from "./pages/NotFound";


function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <ReProvider>
          <Switch>
            <Route exact path="/">
              <LinksTemporal />
            </Route>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route path="/account/activate">
              <AccountActivate />
            </Route>
            <Route path="/account/create">
              <AccountCreate />
            </Route>
            <Route path="/account/login">
              <AccountLogin />
            </Route>
            <Route path="/account/password/change">
              <AccountPasswordChange />
            </Route>
            <Route path="/account/password/recovery">
              <AccountPasswordRecovery />
            </Route>
            <Route path="/advanced-search">
              <AdvancedSearch />
            </Route>
            <Route path="/company/detail">
              <Company />
            </Route>
            <Route exact path="/company/create">
              <CompanyCreate />
            </Route>
            <Route path="/email/activation/recovery">
              <EmailActivationRecovery />
            </Route>
            <Route path="/review/create">
              <ReviewCreate />
            </Route>
            <Route path="/review/user">
              <ReviewUser />
            </Route>
            <Route path="/review/view">
              <ReviewView />
            </Route>
            <Route path="/user/update">
              <UserUpdate />
            </Route>
            <Route path="/user/delete">
              <UserDelete />
            </Route>
            <Route path="/not-found">
              <NotFound />
            </Route>
            <Route path="*">
              <Redirect to="/home" />
            </Route>
          </Switch>
        </ReProvider>
      </BrowserRouter>
    </I18nextProvider>
  );
}

export default App;
