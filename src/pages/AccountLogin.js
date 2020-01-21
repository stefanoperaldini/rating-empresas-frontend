import React from "react";
import i18n from "i18next";
import { useForm } from 'react-hook-form';

import '../css/login.css';
import { Header } from "../components/Header";

/**
 * Page for logining
 */

export function AccountLogin() {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);

  return (
    <React.Fragment>
      <Header />
      <main>
        <h2>{i18n.t("Login")}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label> Email
          <input type="email" placeholder="Email" name="Email" id="email" ref={register({ required: true, pattern: /^\S+@\S+$/i })} />
          {errors.exampleRequired && <span>This field is required</span>}
          </label>
          <label>Password
          <input type="password" placeholder="Password" name="password" id="password" ref={register({ required: true, max: 36, min: 3, maxLength: 36 })} />
          {errors.exampleRequired && <span>This field is required</span>}
          </label>
          <input type="submit" />
        </form>
      </main>
    </React.Fragment>
  );
}