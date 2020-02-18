import React, { useEffect, useState } from "react";
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

import { Cities } from "../components/Cities"
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FileUpload } from "../components/UploadCompanyLogo";

export function CompanyCreate() {
  const { handleSubmit, register, errors, formState, setError } = useForm({
    mode: "onBlur"
  });

  const { currentUserId } = useAuth();

  const history = useHistory();
  const { t } = useTranslation();

  const [companies, setCompanies] = useState([]);
  const [companySelected, setCompanySelected] = useState(null)
  const [idCity, setIdCity] = useState(null);
  const [sectors, setSectors] = useState([]);
  const [company, setCompany] = useState({
    id: null,
    name: null,
    description: null,
    sector_name: null,
    url_web: null,
    linkedin: null,
    address: null,
    sede_id: null,
  });

  const handleCompanyCreate = async formData => {

    let isNewSector = true;
    let sectorId = null;

    if (!idCity) {
      setError("sede_id", "frontend", t("This field is required"));
      return;
    }

    for (let sector of sectors) {
      if (formData.sector === sector.sector) {
        isNewSector = false;
        sectorId = sector.id;
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
        sede_id: idCity,
        sector: undefined,
        sector_id: sectorId
      };

      if (!company.id) {
        createCompany(formDataCompany)
          .then(response => {
            history.push(`/home`);
          })
          .catch(error => {
            setError("sede_id", "backend", setErrorMessageCallBackEnd(error));
          });
      } else {
        updateCompany(company.id, formDataCompany)
          .then(response => {
            history.push(`/home`);
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
    getCompanies(`filters=no`)
      .then(response => {
        const filteredCompany = response.data.rows_companies.filter((companyElement, index) => {
          if (currentUserId === companyElement.user_id) {
            setCompany({
              id: companyElement.company_id,
              name: companyElement.name,
              description: companyElement.description,
              sector_name: companyElement.sector_name,
              url_web: companyElement.url_web,
              linkedin: companyElement.linkedin,
              address: companyElement.address,
              sede_id: companyElement.sede_id,
              sede_name: companyElement.sede_name,

            });
            return true;
          }

          if (companyElement.userRole === "1" || (companyElement.userRole === "2" && companyElement.userDeleteAt !== null)) {
            return true;
          }
          return false;
        })
        setCompanies(filteredCompany)
      }).catch(error => {
        setError("sede_id", "backend", setErrorMessageCallBackEnd(error));
        return;
      });

    getSectors()
      .then(response => {
        setSectors(response.data.rows);
      })
      .catch(error => {
        setError("sector", "backend", setErrorMessageCallBackEnd(error));
        return;
      });

    return;
  }, [currentUserId, setError]);

  useEffect(() => {
    for (let companyElement of companies) {
      if (companySelected === companyElement.name) {
        setCompany({
          id: companyElement.company_id,
          name: companyElement.name,
          description: companyElement.description,
          sector_name: companyElement.sector_name,
          url_web: companyElement.url_web,
          linkedin: companyElement.linkedin,
          address: companyElement.address,
          sede_id: companyElement.sede_id,
          sede_name: companyElement.sede_name,
        });
        break;
      }
    }
  }, [companySelected, companies]);

  return (
    <React.Fragment>
      <Header />
      <main className="centered-container">
        <h1 className="f-s-l">{t("My company")}</h1>
        <FileUpload />
        {/* state.company.url_logo */}
        <img src={defaultImageCompany} alt={t("Default image company")} />
        <form onSubmit={handleSubmit(handleCompanyCreate)} noValidate>
          <div className="form-control">
            <label htmlFor="name">{t("Name")} (*)</label>
            <input
              list="companyName"
              ref={register(validatorCompanyName)}
              name="name"
              id="name"
              type="text"
              value={company.name}
              onChange={e => {
                setCompany({ ...company, name: e.target.value })
                setCompanySelected(e.target.value)
              }
              }
            ></input>
            <datalist id="companyName">
              {companies.map(companyElement => (
                <option key={companyElement.name} value={companyElement.name}>
                  {companyElement.name}
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
              value={company.description}
              placeholder={t("About my company")}
              onChange={e =>
                setCompany({ ...company, description: e.target.value })
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
              value={company.sector_name}
              onChange={e => {
                setCompany({ ...company, sector_name: e.target.value })

              }
              }
            ></input>
            <datalist id="listSectors">
              {sectors.map(sectorElement => (
                <option key={sectorElement.sector} value={sectorElement.sector}>
                  {sectorElement.sector}
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
              value={company.url_web}
              onChange={e =>
                setCompany({ ...company, url_web: e.target.value })
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
              value={company.linkedin}
              onChange={e =>
                setCompany({ ...company, linkedin: e.target.value })
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
              value={company.address}
              onChange={e =>
                setCompany({ ...company, address: e.target.value })
              }
              placeholder={t("Headquarters address")}
            ></input>
            {errors.address && (
              <span className="errorMessage">{t(errors.address.message)}</span>
            )}
          </div>

          <div className="form-control">
            <label htmlFor="sede_id">{t("Headquarters")} (*)</label>
            <Cities onClickCity={id => setIdCity(id)} city={company.sede_name} />
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
    </React.Fragment >
  );
}
