import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";

import { Home } from "./components/Home";
import { AccountActivate } from "./components/AccountActivate";
import { AccountCreate } from "./components/AccountCreate";
import { AccountLogin } from "./components/AccountLogin";
import { AccountPasswordChange } from "./components/AccountPasswordChange";
import { AccountPasswordRecovery } from "./components/AccountPasswordRecovery";
import { AdvancedSearch } from "./components/AdvancedSearch";
import { Company } from "./components/Company";
import { CompanyCreate } from "./components/CompanyCreate";
import { EmailActivationRecovery } from "./components/EmailActivationRecovery";
import { ReviewCreate } from "./components/ReviewCreate";
import { ReviewUser } from "./components/ReviewUser";
import { ReviewView } from "./components/ReviewView";
import { UserUpdate } from "./components/UserUpdate";
import { UserDelete } from "./components/UserDelete";

function App() {
  return (
    <BrowserRouter>
      <main>
        <section id="content">
          <Switch>
            <Route exact path="/">
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
            <Route path="/advancedsearch">
              <AdvancedSearch />
            </Route>
            <Route path="/company/:id">
              <Company />
            </Route>
            <Route path="/company/create">
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
          </Switch>
        </section>
      </main>
    </BrowserRouter>
  );
}

export default App;
