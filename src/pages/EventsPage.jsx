import HeroCarousel from "@/components/EventsPage/HeroCarousel";
import React from "react";

export const EventDetails = [
  {
    title: "MERN Stack Bootcamp",
    desc: "An intensive bootcamp to build full-stack applications using MongoDB, Express, React, and Node.js.",
    image: "/dummy-events/event-1.jpeg",
    date: "2024-10-12",
    status: "upcoming",
    location: "San Francisco, CA",
  },
  {
    title: "JavaScript Essentials Workshop",
    desc: "A beginner-friendly workshop covering the essentials of JavaScript and modern ES6+ features.",
    image: "/dummy-events/event-2.jpeg",
    date: "2024-09-25",
    status: "completed",
    location: "New York, NY",
  },
  {
    title: "React.js Best Practices",
    desc: "Learn best practices and tips for building scalable React applications.",
    image: "/dummy-events/event-3.jpeg",
    date: "2024-10-05",
    status: "completed",
    location: "Los Angeles, CA",
  },
  {
    title: "GraphQL API with Node.js",
    desc: "A workshop focusing on building and integrating GraphQL APIs with Node.js and Express.",
    image: "/dummy-events/event-4.jpeg",
    date: "2024-11-15",
    status: "upcoming",
    location: "Austin, TX",
  },
  {
    title: "Deploying MERN Apps to the Cloud",
    desc: "Learn how to deploy full-stack MERN applications to popular cloud platforms like AWS and Heroku.",
    image: "/dummy-events/event-5.jpeg",
    date: "2024-12-01",
    status: "upcoming",
    location: "Seattle, WA",
  },
];

const EventsPage = () => {
  return (
    <div className="px-[8%]  py-[150px] ">
      <HeroCarousel />
    </div>
  );
};

export default EventsPage;
