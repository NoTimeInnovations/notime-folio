import React from "react";
import EventsPage from "@/mainPages/EventsPage";

const fetchEvents = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/events?depth=2`);
    const data = await response.json();
    return data?.docs;
  } catch (error) {
    console.error("Error fetching events data: ", error);
  }
};

const page = async() => {
  const eventsData = await fetchEvents();
  return <EventsPage eventsData={eventsData}/>
};

export default page;
