import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import NormalButton from "../../common/NormalButton";
import { ValidateAndSubmit } from "@/app/actions/EnrollForm";
import TickMark from "../../common/TickMark";
import GradientText from "../../common/GradientText";
import P from "../../common/P";
import toast from "react-hot-toast";

const SheduleTestForm = ({ isOpen, setFormOpen }) => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [imageUploadPlaceholder, setImageUploadPlaceholder] = useState("Upload transaction screenshot");
  const [transactionScreenshot, setTransactionScreenshot] = useState(null);

  const varients = {
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    referral_code: "",
  });


  const handleImageUpload = (e) => {

    const file = e.target.files[0];

    if (file) {

      const extension = file.name.split(".")[1];
      if (extension !== "jpg" && extension !== "jpeg" && extension !== "png") {
        return toast.error("Invalid file format. Only jpg, jpeg and png files are allowed");
      }

      setImageUploadPlaceholder(file.name);
      setTransactionScreenshot(file);
    }
  }

  return (
    <div className="relative">
      {/* form  */}
      <motion.div
        animate={isFormSubmitted && { opacity: 0, pointerEvents: "none" }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          variants={varients}
          animate={isOpen ? "open" : "closed"}
          className={` overflow-hidden `}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              ValidateAndSubmit(form, setIsFormSubmitted , transactionScreenshot);
            }}
            className="grid gap-5 mt-10 lg:gap-10 py-10"
          >
            {/* name */}
            <input
              className="lg:text-xl focus:outline-none focus:border-white bg-transparent border-b border-b-[#1c222e] text-white w-full p-2"
              placeholder="Full Name"
              type="text"
              name="name"
              id="name"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            {/* Email */}
            <input
              className="lg:text-xl focus:outline-none focus:border-white bg-transparent border-b border-b-[#1c222e] text-white w-full p-2"
              placeholder="Email"
              type="text"
              name="email"
              id="email"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            {/* phone */}
            <input
              className="lg:text-xl focus:outline-none focus:border-white bg-transparent border-b border-b-[#1c222e] text-white w-full p-2"
              placeholder="Phone No."
              type="number"
              name="phone"
              id="phone"
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />

            {/* Referral code  */}
            <input
              className="lg:text-xl focus:outline-none focus:border-white bg-transparent border-b border-b-[#1c222e] text-white w-full p-2"
              placeholder="Referral code [optional]"
              type="text"
              name="referral_code"
              id="referral_code"
              onChange={(e) => setForm({ ...form, referral_code: e.target.value })}
            />

            {/* transaction photo  */}
            {/* <div className="w-full">
              <input type="file" name="transaction_photo" id="transaction_photo" onChange={handleImageUpload} className="hidden" />

              <label htmlFor="transaction_photo" className=" flex items-center gap-3 cursor-pointer lg:text-xl focus:outline-none focus:border-white bg-transparent border-b border-b-[#1c222e] text-[#9ca3af] w-full p-2" > */}

                {/* icon  */}
                {/* <img src="/upload.svg" alt="upload" className="w-8" /> */}

                {/* text  */}
                {/* <p className="ml-2 max-w-[350px] text-ellipsis overflow-hidden text-nowrap ">{imageUploadPlaceholder}</p> */}

              {/* </label>

            </div> */}

            {/* buttons */}
            <div className="flex items-center gap-5 relative z-[49]">
              {/* cancel */}
              <NormalButton
                text={"Cancel"}
                gradient={
                  "bg-gradient-to-r from-red-500 to-red-800 dark-shadow"
                }
                onClick={() => setFormOpen(false)}
              >
                Cancel
              </NormalButton>

              {/* submit */}
              <button type="submit">
                <NormalButton
                  text={"Submit"}
                  gradient={
                    "bg-gradient-to-r from-green-500 to-green-800 white-shadow"
                  }
                >
                  Submit
                </NormalButton>
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>

      {/* success message */}
      <div className="absolute top-20 left-0 pointer-events-none w-full h-fit gap-10 grid place-items-center">
        {/* tick mark  */}

        <TickMark isFormSubmitted={isFormSubmitted} />

        {/* message  */}

        <motion.div
          className="font-medium text-xl lg:text-2xl text-center"
          initial={{ opacity: 0, y: 100 }}
          animate={isFormSubmitted && { opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Thankyou for enrolling!
        </motion.div>

        {/* info  */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={isFormSubmitted && { opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <P>Check your mail for updates!</P>
        </motion.div>
      </div>
    </div>
  );
};

export default SheduleTestForm;
