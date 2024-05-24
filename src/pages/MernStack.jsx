"use client";

import React, { useEffect } from "react";
import HeroSection from "../components/MernStackDev/HeroSection./HeroSection";
import NewEraSection from "../components/MernStackDev/NewEraSection/NewEraSection";
import ScrollProgressIndicator from "../components/common/ScrollProgressIndicator";
import FreeTestSection from "../components/MernStackDev/EnrollmentSection/EnrollmentSection";
import PossibilitiesSection from "../components/MernStackDev/CareerPathsSection/PossibilitiesSection";
import IceBergSection from "../components/MernStackDev/IceBergSection/IceBergSection";
import FrequentlyAskedQuestion from "../components/MernStackDev/FAQ/FrequentlyAskedQuestion";
import NormalButton from "../components/common/NormalButton";
import Link from "next/link";
import WhatWillYouLearn from "../components/MernStackDev/WhatWillYouLearnSection/WhatWillYouLearn";
import Image from "next/image";
import PricingSection from "@/components/MernStackDev/PricingSection/PricingSection";

const MernStack = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen w-screen overflow-hidden py-40 px-5 md:px-10 lg:px-16 text-white grid gap-10 lg:gap-32 place-items-center">
      <ScrollProgressIndicator />

      {/* hero section  */}
      <HeroSection />

      {/* NewEra MERN Stack  */}
      <NewEraSection />

      {/* IceBergSection  */}

      <IceBergSection />

      {/* possibilities  */}
      <PossibilitiesSection />

      {/* what will you learn  */}
      <WhatWillYouLearn />

      {/* Free Test  */}
      <FreeTestSection />

      {/* pricing section  */}
      <PricingSection />

      {/* FrequentlyAskedQuestion  */}
      <FrequentlyAskedQuestion />

      {/* contact us button  */}

      <Link href={"/contact-us"}>
        <NormalButton
          gradient={
            "bg-gradient-to-r from-yellow-500 to-yellow-800 white-shadow flex items-center gap-3"
          }
        >
          Contact Us
          <Image
            width={10}
            height={10}
            src="/add-call.svg"
            alt="contact-us"
            className="w-5"
          />
        </NormalButton>
      </Link>
    </div>
  );
};

export default MernStack;
