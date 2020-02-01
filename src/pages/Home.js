import React from "react";
import { useTranslation } from "react-i18next";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

/**
 * Home page
 */

export function Home() {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <Header />
      <main className="centered-container">
        <section id="info">
          <h2>{t("This is the home page")}</h2>
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
