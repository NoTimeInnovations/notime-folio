"use client";
import React from "react";
import GradientText from "../common/GradientText";
import H1 from "../common/H1";
import { EventDetails } from "@/mainPages/EventsPage";
import EventsCard from "./EventsCard";

const UpcomingEvents = ({eventData}) => {
  const upcomingEvents = eventData?.filter(
    (event) => event?.status === "upcoming"
  );

  return (
    <section className="mt-10 sm:mt-20">

      {/* title  */}
      <H1 className={"text-center"}>
        Upcoming <GradientText>Events</GradientText>
      </H1>

      {/* events  */}
      <div className="grid grid-cols-2 md:grid-cols-3 mt-5 sm:mt-10 gap-3 sm:gap-5">
        {upcomingEvents?.map((event,index) => (
          <EventsCard key={`${event?.title}_${index}_upcoming`} event={event} />
        ))}
      </div>

    </section>
  );
};

export default UpcomingEvents;
