import { Link } from "react-router-dom";
import scatteredforcefields from "../assets/images/scattered-forcefields.svg";

const HomePage = () => {
  return (
    <section className="py-6 sm:py-8 lg:py-12">
      <img
        className="absolute top-0 h-full w-full object-cover object-center opacity-10 blur-[10px] z-[-1]"
        src="https://componentland.com/images/ZbQYxs58uj_TXVLLRtSaa.png"
        alt="Background"
      />
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="relative pt-4">
          <h2 className="text-start text-3xl font-bold text-[#485560]">
            Welcome
          </h2>
          <div className="w-[5px] h-[5px] bg-blue-50"></div>
        </div>
        <div className="grid gap-8 mt-4 sm:grid-cols-2 sm:gap-12 lg:grid-cols-3">
          <Link to="/add-patient">
            <article
              className="relative select-none bg-cover bg-center px-8 pt-10 pb-20 text-[#485560] shadow-md"
              style={{ backgroundImage: `url(${scatteredforcefields})` }}
            >
              <h1 className="text-lg font-semibold">New Patient</h1>
            </article>
          </Link>
          <Link to="/patients">
            <article
              className="relative select-none bg-cover bg-center px-8 pt-10 pb-20 text-[#485560] shadow-md"
              style={{ backgroundImage: `url(${scatteredforcefields})` }}
            >
              <h1 className="text-lg font-semibold">Check Records</h1>
            </article>
          </Link>
          <Link to="/add-doctor">
            <article
              className="relative select-none bg-cover bg-center px-8 pt-10 pb-20 text-[#485560] shadow-md"
              style={{ backgroundImage: `url(${scatteredforcefields})` }}
            >
              <h1 className="text-lg font-semibold">
                Add Doctor
              </h1>
            </article>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
