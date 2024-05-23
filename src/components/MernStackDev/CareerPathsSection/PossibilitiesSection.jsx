import React, { useEffect, useRef } from "react";
import H1 from "../../common/H1";
import P from "../../common/P";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import PossibilitieCard from "./PossibilitieCard";

const PossibilitiesSection = () => {
  const ref = useRef();
  const { scrollYProgress: scrollYProgressLine } = useScroll({
    target: ref,
    offset: ["end center", "start end"],
  });
  var scaleY = useTransform(scrollYProgressLine, [0, 1], ["120%", "-20%"]);

  return (
    <div className="grid gap-4 max-w-2xl">
      {/* heading  */}

      <H1>Career Paths After the Course</H1>

      {/* description  */}

      <P>
        Master the powerful MERN stack and become a full-stack JavaScript
        developer. This comprehensive course will equip you with the skills to
        build modern, scalable, and high-performance web applications.
      </P>

      {/* possibilities  */}

      <div className="h-[100%] grid place-items-center relative">
        {/* center line  */}
        <div
          ref={ref}
          className="absolute w-2 h-[100%] bg-[#212534] rounded-full overflow-hidden"
        >
          {/* coloured line  */}
          <motion.div
            style={{ scaleY: scaleY }}
            className="w-full h-full bg-gradient-to-b from-yellow-500 to-green-500 rounded-full origin-top"
          ></motion.div>
        </div>

        {/* possibilities divs */}

        <div className=" w-full grid gap-44 py-40">
          {/* freelancing  */}

          <PossibilitieCard heading={"Freelancing"} arrange={"justify-center"}>
            Freelancing with the MERN stack is highly in demand and offers
            competitive rates. Developers can build full-stack applications,
            create dynamic user interfaces, and manage databases. Platforms like
            Upwork, Freelancer, and LinkedIn provide numerous job opportunities,
            making it a lucrative and flexible career option.
          </PossibilitieCard>

          {/* mentor  */}
          <PossibilitieCard heading={"Mentor"} arrange={"justify-center"}>
            By learning the MERN stack, you gain opportunities to mentor others
            in MongoDB, Express.js, React.js, and Node.js. As a mentor, you can
            provide guidance in technical skills, career development, and
            project collaboration. This not only helps others but also enhances
            your own understanding and expertise in these technologies.
          </PossibilitieCard>

          {/* Enterprenur  */}
          <PossibilitieCard heading={"Enterprenur"} arrange={"justify-center"}>
            Learning the MERN stack empowers entrepreneurs and startups to
            develop scalable web applications swiftly. With MongoDB, Express.js,
            React.js, and Node.js expertise, they can make informed technical
            decisions, streamline development processes, and iterate on products
            efficiently, gaining a competitive edge in the digital market.
          </PossibilitieCard>

          {/* Full Stack Developer  */}
          <PossibilitieCard heading={"Developer"} arrange={"justify-center"}>
            As a MERN stack developer, you can build web applications,
            e-commerce platforms, social media platforms, or SaaS products.
            Monetize by offering subscription plans, charging for premium
            features, or through advertising. The minimum salary for a MERN
            stack developer in the US is around $75,000 annually. Develop
            innovative solutions and market them effectively to generate
            substantial revenue streams.
          </PossibilitieCard>
        </div>
      </div>
    </div>
  );
};

export default PossibilitiesSection;
