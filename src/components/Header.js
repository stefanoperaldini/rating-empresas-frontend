import React from "react";

import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="header">
      <h1>Rating Empresas</h1>
      <nav>
        <ul>
          <li>
            <Link to="/account/login">
              <p>Sign In
                    </p>
            </Link>
          </li>
          <li>
            <Link to="/account/create">
              <p>--Sign Up
                    </p>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
