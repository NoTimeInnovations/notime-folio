"use client";
import React from "react";
import H1 from "../common/H1";
import GradientText from "../common/GradientText";
import { EventDetails } from "@/mainPages/EventsPage";
import EventsCard from "./EventsCard";

const AllEvents = ({eventData}) => {
  return (
    <section className="mt-10 sm:mt-20">
      {/* title  */}
      <H1>
        All <GradientText>Events</GradientText>
      </H1>

      {/* all events  */}
      <div className="grid grid-cols-2 md:grid-cols-3 mt-5 sm:mt-10 gap-3 sm:gap-5 gap-y-5 sm:gap-y-10">
        {eventData?.map((event, index) => (
          <EventsCard key={`${event?.title}_${index}_allEvent`} event={event} />
        ))}
      </div>
    </section>
  );
};

export default AllEvents;
