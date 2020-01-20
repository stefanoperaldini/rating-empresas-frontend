import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Home() {
  return (
    <React.Fragment>
      <Header />
      <h1>This is the home</h1>
      <Footer />
    </React.Fragment>
  );
}
