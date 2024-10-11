import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";

const Login = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  return (
    <div className="py-16 m-3 p-3 mt-9">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
        <div
          className="hidden lg:block lg:w-1/2 bg-cover"
          style={{
            backgroundImage:
              "url('https://img.freepik.com/photos-gratuite/tir-isole-heureux-beau-conducteur-masculin-scooter-casque-rouge_273609-31424.jpg')",
          }}
        ></div>
        <div className="w-full p-8 lg:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-700 text-center">
            Brand
          </h2>
          <p className="text-xl text-gray-600 text-center">Welcome back!</p>

          <Formik
            initialValues={{ email: "", password: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = "L'adresse e-mail est requise.";
              } else if (!/\S+@\S+\.\S+/.test(values.email)) {
                errors.email = "L'adresse e-mail est invalide.";
              }
              if (!values.password) {
                errors.password = "Le mot de passe est requis.";
              } else if (values.password.length < 6) {
                errors.password =
                  "Le mot de passe doit contenir au moins 6 caractères.";
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              setError("");
              setSuccess("");

              try {
                const response = await axios.post(
                  "http://localhost:5000/auth/login",
                  {
                    email: values.email,
                    password: values.password,
                  }
                );

                if (response.data.message === "OTP sent to email") {
                  setSuccess(
                    "Un e-mail de vérification a été envoyé. Veuillez vérifier votre boîte de réception."
                  );
                  localStorage.setItem("email", values.email);
                  window.location.href = "/Otp";
                } else if (response.data.token) {
                  setSuccess("Connexion réussie.");
                  localStorage.setItem("token", response.data.token);
                  window.location.href = "/";
                }
              } catch (err) {
                setError(
                  err.response?.data?.message ||
                    "Une erreur est survenue. Veuillez réessayer."
                );
              }
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mt-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Adresse e-mail
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="mt-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="password"
                  >
                    Mot de passe
                  </label>
                  <Field
                    type="password"
                    name="password"
                    className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
                  >
                    Connexion
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          {success && (
            <p className="text-green-500 text-center mt-4">{success}</p>
          )}

          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 lg:w-1/4"></span>
            <a href="/register" className="text-xs text-gray-500 uppercase">
              ou inscrivez-vous
            </a>
            <span className="border-b w-1/5 lg:w-1/4"></span>
          </div>
          <a href="/forget-password" className="text-xs text-gray-500">
            Mot de passe oublié ?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
