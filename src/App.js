import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import './App.css';

import { ReviewCreate } from "./components/ReviewCreate";

function App() {
  return (
    <BrowserRouter>
      <main>
        <section id="content">
          <Switch>
            <Route exact path="/">
              <Redirect to="ReviewCreate" />
            </Route>
            <Route path="/ReviewCreate">
              <ReviewCreate />
            </Route>
          </Switch>
        </section>
      </main>
    </BrowserRouter>
  );
}

export default App;
