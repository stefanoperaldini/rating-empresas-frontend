import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Company() {
  return (
    <React.Fragment>
      <Header />
      <h1>This is the company detail</h1>
      <Footer />
    </React.Fragment>
  );
}
