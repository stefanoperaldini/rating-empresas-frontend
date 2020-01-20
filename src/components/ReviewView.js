import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function ReviewView() {
  return (
    <React.Fragment>
      <Header />
      <h1>This is Review View (admin can view and delete a review)</h1>
      <Footer />
    </React.Fragment>
  );
}
