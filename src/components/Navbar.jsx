import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  // Vérifie si l'utilisateur est connecté en vérifiant l'existence d'un jeton dans le localStorage
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    // Supprimer le jeton lors de la déconnexion dans backend et frontend
    axios
      .post("http://localhost:5000/auth/logout")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    // Supprimer le jeton dans le localStorage
    localStorage.removeItem("token");

    // Redirection vers la page d'accueil
    window.location.href = "/";

  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"
      />
      <link
        rel="stylesheet"
        href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"
      />

      <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow-md">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-gray-800 flex items-center"
              to="/"
            >
              <img
                src="/logo2-.png"
                alt="logo"
                className="w-8 h-8 mr-2" 
              />
              alloMedia
            </Link>

            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => {
                const navbar = document.getElementById("navbar-collapse");
                navbar.classList.toggle("hidden");
              }}
            >
              <i className="text-gray-800 fas fa-bars"></i>
            </button>
          </div>

          <div
            className="lg:flex flex-grow items-center bg-white lg:bg-transparent lg:shadow-none"
            id="navbar-collapse"
          >
            <ul className="flex flex-col font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-white bg-purple-700 rounded lg:bg-transparent lg:text-purple-700 lg:p-0 dark:text-white"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Home
                </a>
              </li>
              
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Team
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div
            className="lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none hidden"
            id="navbar-collapse"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto items-center">
              {!isLoggedIn ? (
                <>
                  <li className="flex items-center">
                    <Link
                      to="/login"
                      className="bg-yellow-500 text-gray-800 active:bg-yellow-600 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:bg-yellow-600 hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                    >
                      <i className="fas fa-sign-in-alt mr-2"></i> Login
                    </Link>
                  </li>
                  <li className="flex items-center">
                    <Link
                      to="/register"
                      className="bg-yellow-500 text-gray-800 active:bg-yellow-600 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:bg-yellow-600 hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                    >
                      <i className="fas fa-user-plus mr-2"></i> Register
                    </Link>
                  </li>
                </>
              ) : (
                <li className="flex items-center">
                  <button
                    onClick={handleLogout}
                    className="bg-yellow-500 text-gray-800 active:bg-yellow-600 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:bg-yellow-600 hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                  >
                    <i className="fas fa-sign-out-alt mr-2"></i> Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
