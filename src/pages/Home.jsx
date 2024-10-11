import React from "react";

const Home = () => {
  return (
    <>
      {/* First Hero Section */}
      <section className="hero-section relative m-12 p-3 bg-white dark:bg-gray-900">
        <div className="relative bg-[url('https://static.vecteezy.com/ti/vecteur-libre/p1/1213467-service-de-livraison-d-applications-en-ligne-par-scooter-vectoriel.jpg')] bg-cover bg-center bg-no-repeat">
          <div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25"></div>

          <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
            <div className="max-w-xl text-center sm:text-left">

            </div>
          </div>
        </div>
      </section>
      
    </>
  );
};

export default Home;
