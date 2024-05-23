import React from "react";
import H1 from "../../common/H1";
import GradientText from "../../common/GradientText";
import { motion } from "framer-motion";
import P from "../../common/P";

const IceBergSection = () => {
  return (
    <div className="grid gap-4 md:gap-10 max-w-2xl">
      {/* heading  */}
      <H1>
        Unveiling the{" "}
        <GradientText className={"text-[120%]"}>Depth and Breadth</GradientText>{" "}
        of Our Course
      </H1>

      {/* descriription  */}
      <P>
        Our course offers a comprehensive, immersive learning experience far
        exceeding traditional programs, diving deep into practical skills like{" "}
        <b>
          project building, UI design, pitching ideas, collaborating with
          founders, and securing investments
        </b>
        , ensuring your success in the industry.
      </P>

      {/* image  */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <img src="/ice-berg.png" alt="ice-berg" />
      </motion.div>
    </div>
  );
};

export default IceBergSection;
