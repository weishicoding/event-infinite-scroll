import React from "react";
import { fetchEvents } from "@/app/lib/api";
import EventList from "../components/EventList";

// 12 is all suit page for column 3, 2, 1
const PAGE_SIZE = 12;

const EventListPage = async () => {
  const initialData = await fetchEvents(0, PAGE_SIZE);
  return (
    <div className="px-20 bg-cyan-300">
      <EventList initialData={initialData} pageSize={PAGE_SIZE} />
    </div>
  );
};

export default EventListPage;
