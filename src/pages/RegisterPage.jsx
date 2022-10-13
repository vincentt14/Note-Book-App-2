import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import LocaleContext from "../contexts/LocaleContext";
import { register } from "../utils/api";
import RegisterInput from "../components/RegisterInput";
import PropTypes from "prop-types";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { locale } = useContext(LocaleContext);

  async function onRegisterHandler(user) {
    const { error } = await register(user);
    if (!error) {
      navigate("/");
    }
  }

  return (
    <section className="register-page">
      <h2>{locale === "id" ? "Isi form untuk mendaftar akun." : "Fill the form to register account."}</h2>
      <RegisterInput register={onRegisterHandler} />
      <p>
        {locale === "id" ? "Sudah punya akun? " : "Already have an account? "}
        <Link to="/">{locale === "id" ? "Login di sini" : "Login here"}</Link>
      </p>
    </section>
  );
};

RegisterPage.propTypes = {
  register: PropTypes.func,
};

export default RegisterPage;
