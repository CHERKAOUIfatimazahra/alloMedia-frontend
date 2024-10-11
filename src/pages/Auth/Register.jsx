import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";

function Register() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  return (
    <div className="py-16 m-3 p-3">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
        <div
          className="hidden lg:block lg:w-1/2 bg-cover"
          style={{
            backgroundImage:
              "url('https://t3.ftcdn.net/jpg/02/92/90/56/360_F_292905667_yFUJNJPngYeRNlrRL4hApHWxuYyRY4kN.jpg')",
          }}
        ></div>
        <div className="w-full p-8 lg:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-700 text-center">
            AlloMedia
          </h2>
          <p className="text-xl text-gray-600 text-center">
            Créez un nouveau compte !
          </p>

          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              phoneNumber: "",
              address: "",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.name) {
                errors.name = "Le nom est requis.";
              }
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
              if (!values.phoneNumber) {
                errors.phoneNumber = "Le numéro de téléphone est requis.";
              }
              if (!values.address) {
                errors.address = "L'adresse est requise.";
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              setError(null);
              setSuccess(null);
              try {
                await axios.post("http://localhost:5000/auth/register", {
                  name: values.name,
                  email: values.email,
                  password: values.password,
                  phoneNumber: values.phoneNumber,
                  address: values.address,
                });
                resetForm();
                setSuccess(
                  "Inscription réussie ! Veuillez vérifier votre e-mail pour confirmer votre compte."
                );
              } catch (error) {
                if (error.response) {
                  setError(
                    error.response.data.message ||
                      "Une erreur est survenue lors de l'inscription."
                  );
                } else {
                  setError("Erreur réseau. Veuillez réessayer.");
                }
              }
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mt-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Nom
                  </label>
                  <Field
                    type="text"
                    name="name"
                    className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
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
                  <label className="block text-gray-700 text-sm font-bold mb-2">
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
                <div className="mt-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Numéro de téléphone
                  </label>
                  <Field
                    type="text"
                    name="phoneNumber"
                    className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full"
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Adresse
                  </label>
                  <Field
                    type="text"
                    name="address"
                    className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full"
                  />
                  <ErrorMessage
                    name="address"
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
                    S'inscrire
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          {/* Affichage des messages d'erreur ou de succès */}
          <div className="m-6">
            {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
            {success && (
              <p className="mt-4 text-green-500 text-center">{success}</p>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 lg:w-1/4"></span>
            <span className="border-b w-1/5 lg:w-1/4"></span>
          </div>

          <a
            href="/login"
            className="text-xs text-gray-500 block text-center mt-4"
          >
            J'ai déjà un compte
          </a>
        </div>
      </div>
    </div>
  );
}

export default Register;
