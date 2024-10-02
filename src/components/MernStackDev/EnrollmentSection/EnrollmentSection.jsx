import React, { useEffect, useState } from "react";
import H1 from "../../common/H1";
import P from "../../common/P";
import GradientText from "../../common/GradientText";
import NormalButton from "../../common/NormalButton";
import SheduleTestForm from "./EnrollForm";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const FreeTestSection = () => {
  const [isOpen, setFormOpen] = useState(false);
  const router = useRouter();

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
    <div id="enroll" className="text-white max-w-2xl grid gap-4">
      {/* heading  */}
      <H1>
        Enroll in Our Comprehensive{" "}
        <GradientText className={"text-[120%]"}>Course Today!</GradientText>
      </H1>
      {/* description  */}
      <P>
        Unlock your potential and take the first step towards achieving your
        educational and career goals by enrolling in our comprehensive course.
        Our program is designed to provide you with the skills and knowledge you
        need to succeed. Join our community of learners today and embark on a
        journey of growth and discovery. Don't wait—enroll now and secure your
        future!
      </P>
      {/* form  */}
      <SheduleTestForm isOpen={isOpen} setFormOpen={setFormOpen} />
      {/* Form open button  */}
      <motion.div
        variants={buttonVariants}
        animate={isOpen ? "hidden" : "visible"}
      >
        <NormalButton
          onClick={() => router.push('/registration')}
          gradient={
            "bg-gradient-to-r from-sky-500 to-sky-600 white-shadow"
          }
        >
          Enroll Now
        </NormalButton>
      </motion.div>
    </div>
  );
};

export default FreeTestSection;
