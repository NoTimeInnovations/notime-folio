import React from "react";
import H1 from "./H1";
import P from "./P";

const Founder = ({ photo, name }) => {
  return (
    <div className="flex flex-col justify-center items-center md:flex-row gap-3 md:gap-5">
      <img src={photo} alt={name} className="w-16 lg:w-20 aspect-square rounded-full" />
      <div className="text-center font-medium lg:text-lg">{name}</div>
    </div>
  );
};

const Testimonial = () => {
  return (
    <div className="max-w-6xl mt-10 border-[0.5px] border-[#171b22] bg-[#0b0e13]  pt-10 w-full grid place-items-center gap-5 lg:gap-10 rounded-xl relative overflow-hidden">
      {/* testimonial container  */}
      <div className="grid place-items-center gap-5 lg:grid-cols-[min-content,1fr] lg:px-10 lg:gap-10">
        {/* logo  */}
        <div className="grid gap-5 place-items-center w-fit">
          <img
            src="/notime-logo-circle.png"
            alt="notime"
            className="w-40 md:w-44 aspect-square rounded-full"
          />
          {/* name  */}
          <H1>NoTime</H1>
        </div>
        {/* description  */}
        <P className={"text-justify px-5 md:px-10 lg:px-0 lg:pt-10"}>
          NoTime is a dynamic educational company specializing in the MERN
          stack—MongoDB, Express.js, React.js, and Node.js. We offer hands-on,
          in-depth training led by experienced professionals, providing flexible
          learning options like self-paced courses, live virtual classes, and
          bootcamps. Our comprehensive curriculum and robust career support
          ensure students gain practical skills and are well-prepared for web
          development careers.
        </P>
      </div>

      {/* founder container  */}
      <div className="bg-[#090c0e] grid gap-5 w-full p-5 md:p-10 lg:flex lg:justify-between">
        {/* title  */}
        <div className="text-xl font-semibold lg:text-2xl xl:text-3xl lg:flex items-center text-gray-700">Founders</div>

        {/* founders  */}
        <div className="grid grid-cols-2 gap-5">
          {/* founder  1 */}
          <Founder photo={"/founder/thrisha.jpeg"} name={"Thrisha K"} />
          {/* founder 2  */}
          <Founder
            photo={"/founder/thrisha.jpeg"}
            name={"Muhammed Rinshad S R"}
          />
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
