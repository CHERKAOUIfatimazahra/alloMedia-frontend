import React, { useState } from "react";
import axios from "axios"; 

function Otp() {
  const [otp, setOtp] = useState(Array(6).fill("")); 
  const [email, setEmail] = useState(localStorage.getItem("email")); 
  const [message, setMessage] = useState(""); 

  const handleChange = (e, index) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const otpCode = otp.join(""); // Combine les valeurs de l'OTP en une seule chaîne
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/verify-otp",
        {
          email: email,
          otp: otpCode,
        }
      );

      const token = response.data.token; // Récupération du token de réponse
      localStorage.setItem("token", token); // Enregistrement du token dans le stockage local
      setMessage("OTP verified successfully!");
      // Redirection vers la page d'accueil après une vérification réussie
      window.location.href = "/Dashboard";
    } catch (error) {
      console.error("Error details:", error);
      if (error.response) {
        setMessage(error.response.data.message); // Affiche le message du serveur
      } else {
        setMessage("An error occurred. Please try again.");
      }
    }
  };

  // resend otp
  const handleResendOtp = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/resend-otp",
        {
          email: email,
        }
      );

      setMessage(response.data.message);
    } catch (error) {
      console.error("Error details:", error);
      if (error.response) {
        setMessage(error.response.data.message); // Affiche le message du serveur
      } else {
        setMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl text-[#EFA300]">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your email ba**@dipainhouse.com</p>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col space-y-16">
                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                  {otp.map((value, index) => (
                    <div key={index} className="w-16 h-16">
                      <input type="hidden" value={email} name="email" />

                      <input
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-[#EFA300]"
                        type="text"
                        value={value}
                        onChange={(e) => handleChange(e, index)}
                        maxLength="1" // Limite la saisie à 1 caractère
                      />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col space-y-5">
                  <div>
                    <button
                      type="submit"
                      className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-[#EFA300] border-none text-white text-sm shadow-sm"
                    >
                      Verify Account
                    </button>
                  </div>

                  <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Didn't receive code?</p>
                    <a
                      className="flex flex-row items-center text-[#EFA300]"
                      onClick={handleResendOtp}
                    >
                      Resend
                    </a>
                  </div>
                </div>
                {message && (
                  <p className="text-red-500 text-center mt-4">{message}</p>
                )}{" "}
                {/* Affiche les messages */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Otp;
