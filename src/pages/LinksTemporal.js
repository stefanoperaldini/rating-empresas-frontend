import React from "react";
import { Link } from "react-router-dom";

export function LinksTemporal() {

    return (
        <ul>
            <li>
                <Link to="/home">
                    <p>
                        home
                        </p>
                </Link>
            </li>
            <li>
                <Link to="/review/create">
                    <p>
                        review/create
                        </p>
                </Link>
            </li>
            <li>
                <Link to="/account/activate">
                    <p>/account/activate
                    </p>
                </Link>
            </li>
            <li>
                <Link to="/account/create">
                    <p>/account/create
                    </p>
                </Link>
            </li>
            <li>
                <Link to="/account/login">
                    <p>/account/login
                    </p>
                </Link>
            </li>
            <li>
                <Link to="/account/password/change">
                    <p>/account/password/change
                    </p>
                </Link>
            </li>
            <li>
                <Link to="/account/password/recovery">
                    <p>/account/password/recovery
                    </p>
                </Link>
            </li>
            <li>
                <Link to="/advanced-search">
                    <p>/advanced-search
                    </p>
                </Link>
            </li>
            <li>
                <Link to="/company/detail">
                    <p>/company/detail
                    </p>
                </Link>
            </li>
            <li>
                <Link to="/company/create">
                    <p>/company/create
                    </p>
                </Link>
            </li>
            <li>
                <Link to="/email/activation/recovery">
                    <p>/email/activation/recovery
                    </p>
                </Link>
            </li>
            <li>
                <Link to="/review/user">
                    <p>/review/user
                    </p>
                </Link>
            </li>
            <li>
                <Link to="/review/view">
                    <p>/review/view
                    </p>
                </Link>
            </li>
            <li>
                <Link to="/user/update">
                    <p>/user/update
                    </p>
                </Link>
            </li>
            <li>
                <Link to="/user/delete">
                    <p>/user/delete
                    </p>
                </Link>
            </li>
            <li>
                <Link to="/not-found">
                    <p>/not-found
                    </p>
                </Link>
            </li>
        </ul>
    );
}
