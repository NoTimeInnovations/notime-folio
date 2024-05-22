import React from "react";
import { motion } from "framer-motion";

const SocialLinks = () => {
  const links = [
    {
      img: "/social/whatsapp.svg",
      link: "https://wa.me/+917012944024",
    },
    {
      img: "/social/youtube.svg",
      link: "https://www.youtube.com/@notimeinstitution6818",
    },
    {
      img: "/social/linkedin.svg",
      link: "https://www.linkedin.com/company/notime-edu/",
    },
    {
      img: "/social/instagram.svg",
      link: "https://www.instagram.com/notime.co.in/",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView={"visible"}
      viewport={{ once: true }}
      className="flex gap-10 py-10 overflow-hidden px-1"
    >
      {links.map((link, index) => (
        <a key={`social_link_${index}`} href={link.link}>
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.2, y: -20 }}
            viewport={{ once: true }}
          >
            <img src={link.img} alt="social" className="w-8 lg:w-6 xl:w-8" />
          </motion.div>
        </a>
      ))}
    </motion.div>
  );
};

export default SocialLinks;
