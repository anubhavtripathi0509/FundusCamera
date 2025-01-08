import { dotted_rows, hero_img, services_img, features_img } from "../assets";

const AboutUsPage = () => {
  return (
    <div className="container m-auto w-screen h-screen">
      <div className="px-4 w-full h-[500px] flex flex-row justify-center items-center">
        <div className="px-4 pt-4 pb-6">
          <p className="text-4xl font-bold">
            Our vision is to make healthcare accessible.
          </p>
          <br />
          <p className="text-2xl">
            NetraX impacts vision impairment by enabling access to early
            detection of eye diseases.
          </p>
        </div>
        <div>
          <img
            className="object-cover object-center w-full h-1/2"
            src={hero_img}
            alt="Our vision"
          />
        </div>
      </div>
      <section className="relative overflow-hidden">
        <img
          className="absolute top-0 h-full w-full object-cover object-center opacity-10 blur-[10px] z-[1]"
          src="https://componentland.com/images/ZbQYxs58uj_TXVLLRtSaa.png"
          alt="Background pattern"
        />
        <div className="bg-white relative mx-auto flex h-full w-full flex-col items-center justify-center px-4 py-12  backdrop-blur-md sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <h2 className="-mx-4 px-4 pt-4 pb-6 text-3xl sm:text-4xl xl:text-5xl">
            Our <span className="font-bold">Mission</span>
          </h2>
          <div className="mx-auto grid max-w-screen-lg grid-cols-1 gap-y-4 gap-x-8 text-center sm:mt-12 sm:text-left md:grid-cols-3">
            <div className="bg-white/10 relative mb-3 rounded-3xl border px-12 py-10 text-left shadow backdrop-blur-lg lg:px-12 ">
              <p className="relative text-3xl font-black sm:text-5xl ">25M</p>
              <p className="relative mt-5 text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Asperiores doloremque vel
              </p>
            </div>
            <div className="bg-white/10 relative mb-3 rounded-3xl border px-12 py-10 text-left shadow backdrop-blur-lg lg:px-12">
              <p className="relative text-3xl font-black sm:text-5xl">51%</p>
              <p className="relative mt-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Asperiores doloremque vel
              </p>
            </div>
            <div className="bg-white/10 relative mb-3 rounded-3xl border px-12 py-10 text-left shadow backdrop-blur-lg lg:px-12">
              <p className="relative text-3xl font-black sm:text-5xl">8529+</p>
              <p className="relative mt-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Asperiores doloremque vel
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="relative overflow-hidden">
        <img
          className="absolute top-[200px] -right-[500px] h-full w-full object-cover object-center opacity-10 blur-[70px] z-[5]"
          src="https://componentland.com/images/ZbQYxs58uj_TXVLLRtSaa.png"
          alt="Background pattern"
        />
        <div className="bg-white relative mx-auto flex h-full w-full flex-col items-center justify-center px-4 py-12  backdrop-blur-md sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <h2 className="-mx-4 px-4 pt-4 pb-6 text-3xl">
            Our <span className="font-bold">Strategy</span>
          </h2>
          <p className="text-2xl mt-10 text-center">
            NetraX is aggressively decentralizing comprehensive eye testing
            using AI and telemedicine integrated, easy to use ophthalmic
            devices. Healthcare workers, vision technicians, and even an
            inexperienced volunteer can use these products with minimal training
            in non-specialist contexts such as Public Health Centres,
            Supermarkets and even in the convenience of a patient's Home.
          </p>
          <div className="h-[600px] mt-16">
            <img
              className="object-cover object-center w-full h-full"
              src={services_img}
              alt="Our Strategy"
            />
            <img
              src={dotted_rows}
              alt="Feature Section Dotted Rows"
              loading="lazy"
              width="240"
              height="170"
              className="relative -top-[1100px] -left-[270px] inline-block z-[1]"
            />
            <img
              src={dotted_rows}
              alt="Feature Section Dotted Rows"
              loading="lazy"
              width="240"
              height="170"
              className="relative -top-[900px] -right-[650px] inline-block rotate-180"
            />
          </div>
        </div>
      </section>
      <section className="relative overflow-hidden">
        <img
          className="absolute top-0 h-full w-full object-cover object-center opacity-10 blur-[10px] z-[1]"
          src="https://componentland.com/images/ZbQYxs58uj_TXVLLRtSaa.png"
          alt="Background pattern"
        />
        <div className="bg-white relative mx-auto flex h-full w-full flex-col items-center justify-center px-4 py-12 pt-6 backdrop-blur-md sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <h2 className="-mx-4 px-4 pb-6 text-3xl sm:text-4xl xl:text-5xl">
            Our <span className="font-bold">Approach</span>
          </h2>
          <div className="mx-auto grid max-w-screen-lg grid-cols-1 gap-y-4 gap-x-8 text-center sm:mt-12 sm:text-left md:grid-cols-3 ">
            <div className="bg-white/10 relative mb-3 rounded-3xl border p-5 text-left shadow backdrop-blur-lg lg:px-12 ">
              <p className="relative text-3xl font-black">
                Public Healthcare Centres
              </p>
              <p className="relative mt-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Asperiores doloremque vel
              </p>
            </div>
            <div className="bg-white/10 relative mb-3 rounded-3xl border p-5 text-left shadow backdrop-blur-lg lg:px-12">
              <p className="relative text-3xl font-black">Pharmacy</p>
              <p className="relative mt-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Asperiores doloremque vel
              </p>
            </div>
            <div className="bg-white/10 relative mb-3 rounded-3xl border p-5 text-left shadow backdrop-blur-lg lg:px-12">
              <p className="relative text-3xl font-black">Opthalmic Clinic</p>
              <p className="relative mt-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Asperiores doloremque vel
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <img
          className="absolute top-[200px] -right-[500px] h-full w-full object-cover object-center opacity-10 blur-[70px] z-[5]"
          src="https://componentland.com/images/ZbQYxs58uj_TXVLLRtSaa.png"
          alt="Background pattern"
        />
        <div className="bg-white relative mx-auto flex h-full w-full flex-col items-center justify-center px-4 py-12  backdrop-blur-md sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <h2 className="-mx-4 px-4 pt-4 pb-6 text-3xl sm:text-4xl xl:text-5xl">
            Our <span className="font-bold">Values</span>
          </h2>
          <p className="text-2xl mt-10 text-center">
            NetraX is building the next generation of vision screening
            technology and has expanded access to eye care by enabling the easy
            screening of patients. NetraX’s value is in increasing screening
            efficiency, reducing patient waiting time, providing better access
            to healthcare, and improving overall patient satisfaction.
          </p>
          <div className="h-[600px] mt-16">
            <img src={features_img} alt="NetraX Value" />
            <img
              src={dotted_rows}
              alt="Feature Section Dotted Rows"
              loading="lazy"
              width="240"
              height="170"
              className="relative -top-[1100px] -left-[270px] inline-block z-[1]"
            />
            <img
              src={dotted_rows}
              alt="Feature Section Dotted Rows"
              loading="lazy"
              width="240"
              height="170"
              className="relative -top-[900px] -right-[650px] inline-block rotate-180"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
