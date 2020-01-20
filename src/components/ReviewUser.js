import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function ReviewUser() {
  return (
    <React.Fragment>
      <Header />
      <h1>This is Review User (user can see his/her reviews)</h1>
      <Footer />
    </React.Fragment>
  );
}
