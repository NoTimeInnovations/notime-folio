import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import NormalButton from "../../common/NormalButton";
import { ValidateAndSubmit } from "@/app/actions/FreeTestForm";
import TickMark from "../../common/TickMark";
import GradientText from "../../common/GradientText";
import P from "../../common/P";

const SheduleTestForm = ({ isOpen, setFormOpen }) => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [currentDate, setCurrentDate] = useState("2024-01-01T00:00");

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

  const getFormatedDate = (date) => {
    const formattedDateTimeString = date;
    const formattedDateTime = new Date(formattedDateTimeString);

    const year = formattedDateTime.getFullYear();
    const month = String(formattedDateTime.getMonth() + 1).padStart(2, "0");
    const day = String(formattedDateTime.getDate()).padStart(2, "0");
    const hours = formattedDateTime.getHours();
    const minutes = String(formattedDateTime.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;

    const formattedDate = `${month}/${day}/${year}`;
    const formattedTime = `${formattedHours}:${minutes} ${ampm}`;
    const formattedDateAndTime = `${formattedDate} - ${formattedTime}`;

    return formattedDateAndTime;
  };

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
  });

  useEffect(() => {
    const currentTime = new Date().toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
    const currentDate = new Date().getDate();
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const currentDateTime = `${currentYear}-${
      currentMonth < 10 && "0" + currentMonth
    }-${currentDate}T${currentTime}`;
    setCurrentDate(currentDateTime);
    setForm({ ...form, date: currentDateTime });
  }, []);

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
              ValidateAndSubmit(form, setIsFormSubmitted);
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

            {/* date */}
            <input
              className="lg:text-xl focus:outline-none focus:border-white bg-transparent border-b border-b-[#1c222e] text-white w-full p-2"
              type="datetime-local"
              name="date"
              id="date"
              pattern="\d{2}-\d{2}-\d{4}"
              min={currentDate}
              defaultValue={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />

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
          Your test is scheduled on <br />{" "}
          <GradientText>{getFormatedDate(form.date)}</GradientText>
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
