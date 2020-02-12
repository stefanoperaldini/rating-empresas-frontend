import React, { useEffect, useReducer } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useAuth } from "../context/auth-context";
import defaultImageCompany from "../img/company-default.png";

import {
  getCompanies,
  getSectors,
  createCompany,
  updateCompany,
  createSector
} from "../http/companyService";
import {
  setErrorMessageCallBackEnd,
  validatorLinkedin,
  validatorCompanyName,
  validatorDescription,
  validatorUrl,
  validatorAddress,
  validatorSector
} from "./pagesUtils";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

function companyReducer(state, action) {
  switch (action.type) {
    case "GET_COMPANIES":
      return { ...state, companies: action.initialCompanies };
    case "GET_SECTORS":
      return { ...state, sectors: action.initialSectors };

    case "SET_COMPANY":
      return {
        ...state,
        indexCompany: action.initialCompany,
        isSavedCompany: true
      };

    case "DATA_SET":
      return { ...state, company: { ...state.company, ...action.data } };

    default:
      return state;
  }
}

/**
 * Page for create company
 */

export function CompanyCreate() {
  const { handleSubmit, register, errors, formState, setError } = useForm({
    mode: "onBlur"
  });

  const { currentUserId } = useAuth();

  const history = useHistory();
  const { t } = useTranslation();

  const [state, dispatch] = useReducer(companyReducer, {
    companies: [],
    sectors: [],
    cities: [],
    indexCompany: null,
    company: {
      name: "",
      description: "",
      sector: "",
      url_web: "",
      linkedin: "",
      address: ""
    },
    sector: { id: null, name: null },
    city: { id: null, name: null },
    isSavedCompany: false
  });

  const handleCompanyCreate = async formData => {
    let isNewSector = true;
    let sectorId = null;

    for (let sector of state.sectors) {
      if (formData.sector === sector.sector) {
        isNewSector = false;
        sectorId = sector.id;
      }
    }

    let companyId = null;
    for (let company of state.companies) {
      if (formData.name === company.name) {
        companyId = company.id;
        break;
      }
    }

    try {
      if (isNewSector) {
        const { headers } = await createSector({ sector: formData.sector });
        const location = headers.location.split("/");
        sectorId = location[location.length - 1];
      }

      const formDataCompany = {
        ...formData,
        sector: undefined,
        sector_id: sectorId
      };

      if (!companyId) {
        createCompany(formDataCompany)
          .then(response => {
            const location = response.headers.location.split("/");
            companyId = location[location.length - 1];
            history.push(`/company/detail/${companyId}`);
          })
          .catch(error => {
            setError("sede_id", "backend", setErrorMessageCallBackEnd(error));
          });
      } else {
        updateCompany(companyId, formDataCompany)
          .then(response => {
            history.push(`/company/detail/${companyId}`);
          })
          .catch(error => {
            setError("sede_id", "backend", setErrorMessageCallBackEnd(error));
          });
      }
    } catch (error) {
      setError("sector", "backend", setErrorMessageCallBackEnd(error));
    }
  };

  useEffect(() => {
    getCompanies()
      .then(response => {
        const filteredCompany = response.data.rows_companies.filter((company, index) => {
          if (currentUserId === company.user_id) {
            dispatch({ type: "SET_COMPANY", initialCompany: index });
            dispatch({ type: "DATA_SET", data: { name: company.name } });
            dispatch({
              type: "DATA_SET",
              data: { description: company.description }
            });
            dispatch({ type: "DATA_SET", data: { sector: company.sector } });
            dispatch({ type: "DATA_SET", data: { url_web: company.url_web } });
            dispatch({
              type: "DATA_SET",
              data: { linkedin: company.linkedin }
            });
            dispatch({ type: "DATA_SET", data: { address: company.address } });
            dispatch({ type: "DATA_SET", data: { sede_id: company.sede_id } });
            return true;
          }
          if (
            company.userRole === "1" ||
            (company.userRole === "2" && company.userDeleteAt !== null)
          ) {
            return true;
          }
          return false;
        });
        dispatch({ type: "GET_COMPANIES", initialCompanies: filteredCompany });
      })
      .catch(error => {
        setError("sede_id", "backend", setErrorMessageCallBackEnd(error));
        return;
      });

    getSectors()
      .then(response => {
        dispatch({ type: "GET_SECTORS", initialSectors: response.data.rows });
      })
      .catch(error => {
        setError("sector", "backend", setErrorMessageCallBackEnd(error));
        return;
      });
    return;
  }, [currentUserId, setError]);

  return (
    <React.Fragment>
      <Header />
      <main className="centered-container">
        <h3>{t("My company")}</h3>
        <img
          src={defaultImageCompany}
          alt={t("Default image company")}
        />
        <form onSubmit={handleSubmit(handleCompanyCreate)} noValidate>
          <div className="form-control">
            <label htmlFor="name">{t("Name")} (*)</label>
            <input
              list="companyName"
              ref={register(validatorCompanyName)}
              name="name"
              id="name"
              type="text"
              value={state.company.name}
              onChange={e =>
                dispatch({ type: "DATA_SET", data: { name: e.target.value } })
              }
            ></input>
            <datalist id="companyName">
              {state.companies.map(element => (
                <option key={element.name} value={element.name}>
                  {element.name}
                </option>
              ))}
            </datalist>
            {errors.name && (
              <span className="errorMessage">{t(errors.name.message)}</span>
            )}
          </div>

          <div className="form-control">
            <label htmlFor="description">{t("Description")}</label>
            <textarea
              ref={register(validatorDescription)}
              name="description"
              id="description"
              type="text"
              value={state.company.description}
              placeholder={t("About my company")}
              onChange={e =>
                dispatch({
                  type: "DATA_SET",
                  data: { description: e.target.value }
                })
              }
            ></textarea>
            {errors.description && (
              <span className="errorMessage">
                {t(errors.description.message)}
              </span>
            )}
          </div>

          <div className="form-control">
            <label htmlFor="sector">{t("Sector")} (*)</label>

            <input
              list="listSectors"
              ref={register(validatorSector)}
              name="sector"
              id="sector"
              type="text"
              placeholder={t("Sector name")}
              value={state.company.sector}
              onChange={e =>
                dispatch({ type: "DATA_SET", data: { sector: e.target.value } })
              }
            ></input>
            <datalist id="listSectors">
              {state.sectors.map(element => (
                <option key={element.name} value={element.sector}>
                  {element.sector}
                </option>
              ))}
            </datalist>
            {errors.sector && (
              <span className="errorMessage">{t(errors.sector.message)}</span>
            )}
          </div>

          <div className="form-control">
            <label htmlFor="url_web">{t("URL")}</label>
            <input
              ref={register(validatorUrl)}
              name="url_web"
              id="url_web"
              type="url"
              placeholder={t("Website")}
              value={state.company.url_web}
              onChange={e =>
                dispatch({
                  type: "DATA_SET",
                  data: { url_web: e.target.value }
                })
              }
            ></input>
            {errors.url_web && (
              <span className="errorMessage">{t(errors.url_web.message)}</span>
            )}
          </div>

          <div className="form-control">
            <label htmlFor="linkedin">{t("LinkedIn")}</label>
            <input
              ref={register(validatorLinkedin)}
              name="linkedin"
              id="linkedin"
              type="url"
              placeholder={t("LinkedIn address")}
              value={state.company.linkedin}
              onChange={e =>
                dispatch({
                  type: "DATA_SET",
                  data: { linkedin: e.target.value }
                })
              }
            ></input>
            {errors.linkedin && (
              <span className="errorMessage">{t(errors.linkedin.message)}</span>
            )}
          </div>

          <div className="form-control">
            <label htmlFor="address">{t("Headquarters address")}</label>
            <input
              ref={register(validatorAddress)}
              name="address"
              id="address"
              type="text"
              value={state.company.address}
              onChange={e =>
                dispatch({
                  type: "DATA_SET",
                  data: { address: e.target.value }
                })
              }
              placeholder={t("Headquarters address")}
            ></input>
            {errors.address && (
              <span className="errorMessage">{t(errors.address.message)}</span>
            )}
          </div>

          <div className="form-control">
            <label htmlFor="sede_id">{t("Headquarters")} (*)</label>
            <input
              ref={register({
                required: "Required"
              })}
              name="sede_id"
              id="sede_id"
              type="text"
              value={state.company.sede_id}
              onChange={e =>
                dispatch({
                  type: "DATA_SET",
                  data: { sede_id: e.target.value }
                })
              }
              placeholder={t("Headquarters")}
            ></input>
            {errors.sede_id && (
              <span className="errorMessage">{t(errors.sede_id.message)}</span>
            )}
          </div>
          <p>(*) {t("Field required")}</p>
          <div className="btn-container">
            <button
              type="submit"
              className="btn"
              disabled={formState.isSubmitting}
            >
              {t("Save")}
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </React.Fragment>
  );
}
