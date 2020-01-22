import React from "react";
import { Link } from "react-router-dom";

export function LinksTemporal() {

    return (
        <ul>
            <li>
                <Link to="/home">
                    <p>Home</p>
                </Link>
            </li>
            <li>
                <Link to="/advanced-search">
                    <p>Advanced search</p>
                </Link>
            </li>
            <li>
                <Link to="/company/detail">
                    <p>Company detail</p>
                </Link>
            </li>
            <li>
                <Link to="/account/create">
                    <p>Account create</p>
                </Link>
            </li>
            <li>
                <Link to="/account/activate/b1d48660-ccf3-4b48-b33f-506d5b790862">
                    <p>Account activate</p>
                </Link>
            </li>
            <li>
                <Link to="/account/login">
                    <p>Account login</p>
                </Link>
            </li>
            <li>
                <Link to="/account/password/change">
                    <p>Account password change</p>
                </Link>
            </li>
            <li>
                <Link to="/account/password/recovery">
                    <p>Account password recovery</p>
                </Link>
            </li>
            <li>
                <Link to="/email/activation/recovery">
                    <p>User email activation recovery</p>
                </Link>
            </li>
            <li>
                <Link to="/user/update">
                    <p>User update</p>
                </Link>
            </li>
            <li>
                <Link to="/user/delete">
                    <p>User delete</p>
                </Link>
            </li>
            <li>
                <Link to="/company/create">
                    <p>Company create</p>
                </Link>
            </li>
            <li>
                <Link to="/review/create">
                    <p>Review create</p>
                </Link>
            </li>
            <li>
                <Link to="/review/user">
                    <p>Reviews user</p>
                </Link>
            </li>
            <li>
                <Link to="/not-found">
                    <p>Page not found</p>
                </Link>
            </li>
        </ul>
    );
}