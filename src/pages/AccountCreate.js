import React, { useState } from "react";
import i18n from "i18next";
import "../css/account-create.css";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Header } from "../components/Header";
import { RadioButton } from "../components/radiobutton";
import logo from "../img/logo100x100.jpeg";

export function AccountCreate() {
  const { handleSubmit, register, errors, formState } = useForm({
    mode: "onBlur"
  });
  const history = useHistory();

  const handleCreate = formData => {
    console.log(formData);
    history.push("/home");
  };
  const [type, setType] = useState("unchecked");

  return (
    <React.Fragment>
      <Header />
      <main className="centered-container">
        <div className="mini">
          <img src={logo} alt="logo small" />
          <p>RATING EMPRESAS</p>
        </div>

        <h3>{i18n.t("Create your account")}</h3>

        <form onSubmit={handleSubmit(handleCreate)} noValidate>
          <div>
            <RadioButton
              text="Employee"
              value="1"
              checked={type === "1"}
              onRadioChange={val => setType(val)}
            />
            <RadioButton
              text="Enterprise"
              value="2"
              checked={type === "2"}
              onRadioChange={v => setType(v)}
            />
          </div>

          <div>
            <label>{i18n.t("name")}</label>

            <input
              name="name"
              type="text"
              placeholder="Please enter your name"
            ></input>
          </div>

          <div
            className={`form-control ${
              errors.email ? "ko" : formState.touched.email && "ok"
            }`}
          >
            <label htmlFor="email">{i18n.t("Email")}</label>
            <input
              ref={register({
                required: "The email is mandatory",
                pattern: {
                  value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "The email is not valid"
                }
              })}
              name="email"
              id="email"
              type="email"
              placeholder={i18n.t("Please enter your email")}
            ></input>
            {errors.email && (
              <span className="errorMessage">
                {i18n.t(errors.email.message)}
              </span>
            )}
          </div>

          <div>
            <label>{i18n.t("LinkedIn")}</label>

            <input
              name="linkedin"
              type="text"
              placeholder="Please enter your linkedin address"
            ></input>
          </div>

          <div
            className={`form-control ${
              errors.password ? "ko" : formState.touched.password && "ok"
            }`}
          >
            <label>Password</label>
            <input
              ref={register({
                required: "The password is mandatory",
                minLength: {
                  value: /^[a-zA-Z0-9]{3,30}$/,
                  message:
                    "You should enter a password between 3 and 30 alphanumerichal characters"
                }
              })}
              name="password"
              type="password"
              placeholder="Please enter your password"
            ></input>
            {errors.password && (
              <span className="errorMessage">{errors.password.message}</span>
            )}
          </div>

          <div
            className={`form-control ${
              errors.password1 ? "ko" : formState.touched.password1 && "ok"
            }`}
          >
            <label>Password</label>
            <input
              ref={register({
                required: "The password must be the same",
                minLength: {
                  value: /^[a-zA-Z0-9]{3,30}$/,
                  message: "the password must be the same"
                }
              })}
              name="password1"
              type="password1"
              placeholder="Please reenter your password"
            ></input>
            {errors.password1 && (
              <span className="errorMessage">{errors.password1.message}</span>
            )}
          </div>

          <div className="btn-container">
            <button
              type="submit"
              className="btn"
              disabled={formState.isSubmitting}
            >
              {i18n.t("Create Account")}
            </button>
          </div>
        </form>
      </main>
    </React.Fragment>
  );
}
