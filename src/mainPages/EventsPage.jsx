import AllEvents from "@/components/EventsPage/AllEvents";
import HeroCarousel from "@/components/EventsPage/HeroCarousel";
import UpcomingEvents from "@/components/EventsPage/UpcomingEvents";
import React from "react";

const EventsPage = ({eventsData}) => {
  return (
    <main className="px-[5%] sm:px-[8%]  py-[120px] ">
      {
        eventsData ? (
          <>
            <HeroCarousel eventData={eventsData} />
            <UpcomingEvents eventData={eventsData} />
            <AllEvents eventData={eventsData} />
          </>
        ) : (
          <p className="text-white">No Events yet!...</p>
        )
      }
    </main>
  );
};

export default EventsPage;
