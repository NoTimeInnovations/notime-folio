import React, { useEffect, useState } from "react";
import H1 from "../../common/H1";
import P from "../../common/P";
import GradientText from "../../common/GradientText";
import NormalButton from "../../common/NormalButton";
import SheduleTestForm from "./SheduleTestForm";
import { motion } from "framer-motion";

const FreeTestSection = () => {
  const [isOpen, setFormOpen] = useState(false);

  const buttonVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5,
      },
    },
  };

  return (
    <div className="text-white max-w-2xl grid gap-4">
      {/* heading  */}
      <H1>
        Select your level by clearing a{" "}
        <GradientText className={"text-[120%]"}>free test</GradientText>
      </H1>
      {/* description  */}
      <P>
        Welcome to our comprehensive level assessment test! Take advantage of
        this complimentary opportunity to gauge your proficiency and select the
        appropriate level for your learning journey. Whether you're a beginner,
        intermediate, or advanced learner, this test will provide valuable
        insights to help you progress effectively. Clear the test with
        confidence and embark on your path to success!
      </P>
      {/* form  */}
      <SheduleTestForm isOpen={isOpen} setFormOpen={setFormOpen} />
      {/* Form open button  */}
      <motion.div
        variants={buttonVariants}
        animate={isOpen ? "hidden" : "visible"}
      >
        <NormalButton
          onClick={() => setFormOpen(true)}
          gradient={
            "bg-gradient-to-r from-sky-500 to-sky-600 white-shadow mt-10"
          }
        >
          Schedule Now
        </NormalButton>
      </motion.div>
    </div>
  );
};

export default FreeTestSection;
