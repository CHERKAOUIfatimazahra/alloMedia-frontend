import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
const queryParams = new URLSearchParams(window.location.search);

function ResetPassword() {
  const token = queryParams.get("token");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  return (
    <main id="content" role="main" className="w-full max-w-md mx-auto p-6">
      <div className="mt-16 bg-white rounded-xl shadow-lg border-2 border-yellow-400">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800">
              Reset Password
            </h1>
          </div>

          <div className="mt-5">
            {message && (
              <p className="text-sm text-green-600 text-center">{message}</p>
            )}
            {error && (
              <p className="text-sm text-red-600 text-center">{error}</p>
            )}

            <Formik
              initialValues={{ newPassword: "" }}
              validate={(values) => {
                const errors = {};
                if (!values.newPassword) {
                  errors.newPassword = "Le mot de passe est requis.";
                } else if (values.newPassword.length < 6) {
                  errors.newPassword =
                    "Le mot de passe doit contenir au moins 6 caractères.";
                }
                return errors;
              }}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                setMessage("");
                setError("");
                try {
                  const response = await axios.post(
                    "http://localhost:5000/auth/reset-password",
                    {
                      token,
                      newPassword: values.newPassword,
                    }
                  );
                  setMessage(response.data.message);
                  resetForm();
                } catch (error) {
                  setError(
                    error.response?.data?.message ||
                      "Une erreur est survenue, veuillez réessayer."
                  );
                }
                setSubmitting(false);
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="grid gap-y-4">
                    <div>
                      <label
                        htmlFor="newPassword"
                        className="block text-sm font-bold ml-1 mb-2 text-gray-800"
                      >
                        Nouveau mot de passe
                      </label>
                      <div className="relative">
                        <Field
                          type="password"
                          id="newPassword"
                          name="newPassword"
                          className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-yellow-500 focus:ring-yellow-500 shadow-sm"
                        />
                        <ErrorMessage
                          name="newPassword"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-yellow-500 text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-all text-sm"
                    >
                      Réinitialiser le mot de passe
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ResetPassword;
