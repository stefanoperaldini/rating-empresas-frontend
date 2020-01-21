import React from "react";

import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="header">
      <h1>Rating Empresas</h1>
      <nav>
        <Link to="/account/login">
          <p>/account/login
                    </p>
        </Link>
        <Link to="/account/create">
          <p>/account/create
                    </p>
        </Link>
      </nav>
    </header>
  );
}
