import React from "react";
import i18n from "i18next";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

/**
 * Home page
 */

export function Home() {
  return (
    <React.Fragment>
      <Header />
      <main>
        <section id="info">
          <h2>{i18n.t("This is the home")}</h2>
          <div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente perspiciatis nobis unde tempore
                    blanditiis. </p>
            <p> Similique quae
                ducimus nostrum voluptatibus culpa dolore reprehenderit vero voluptatum temporibus reiciendis!
                    Obcaecati.</p>
          </div>
        </section>
      </main>
      <Footer />
    </React.Fragment>
  );
}
