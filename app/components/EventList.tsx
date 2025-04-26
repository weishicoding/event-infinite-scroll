"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import EventItem from "./EventItem";
import { fetchEvents } from "../lib/api";
import { Event } from "../lib/type";

interface InitialData {
  events: Event[];
  hasMoreData: boolean;
  eventTotalCount: number;
}

interface EventListProps {
  initialData: InitialData;
  pageSize: number;
}

const EventList = ({ initialData, pageSize }: EventListProps) => {
  const [events, setEvents] = useState(initialData.events);
  const [hasMoreData, setHasMoredata] = useState(initialData.hasMoreData);
  const [isLoading, setIsLoading] = useState(false);
  const [eventTotal, setEventTotal] = useState(initialData.eventTotalCount);

  // initial begin is 0, so next begin should be equal event.length
  const [nextBegin, setNextBegin] = useState(initialData.events.length);

  const observerRef = useRef(null); // to be used Intersection Observer

  // Here use useCallback for loadMoreEvents to prevent creating new functions on unnecessary re-rendering
  // Only create new function when isLoading, hasMoreData, pageSize and nextBegin changes
  const loadMoreItems = useCallback(async () => {
    if (isLoading || !hasMoreData) return;

    setIsLoading(true);
    const currentBegin = nextBegin;
    const currentEnd = currentBegin + pageSize;

    try {
      const moreData = await fetchEvents(currentBegin, currentEnd);
      setEvents((preEvents) => [...preEvents, ...moreData.events]);
      setHasMoredata(moreData.hasMoreData);
      setEventTotal(moreData.eventTotalCount);
      setIsLoading(false);

      setNextBegin(currentEnd);
    } catch (error) {
      console.log("Faild to fetch more data");
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasMoreData, pageSize, nextBegin]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // When the observed element enters the viewport
        if (entries[0].isIntersecting && hasMoreData && !isLoading) {
          loadMoreItems();
        }
      },
      {
        // Setting these two value becuase reduce trigger error and looks like always laoding data at the bottom
        threshold: 0.8, // Triggered when 80% is visible
        rootMargin: "100px", // Triggered before 100px
      }
    );

    const currentObserver = observerRef.current;
    if (currentObserver) {
      observer.observe(currentObserver);
    }

    return () => {
      if (currentObserver) {
        observer.unobserve(currentObserver);
      }
    };
  }, [loadMoreItems, hasMoreData, isLoading]);

  return (
    <div className="p-4">
      <div className="font-bold text-2xl mb-4">{`Showing ${events.length} out of ${eventTotal} total events`}</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event, index) => (
          <EventItem key={event.eventId || `event-${index}`} {...event} />
        ))}
      </div>
      {/* Setting a div at the bottom and observer, triggering function and load more data and rerend data when scroll down to this div  */}
      <div ref={observerRef} className="h-10" />

      {hasMoreData && (
        <div className="mt-10 hy-10 text-center">
          {isLoading ? "Loading data..." : ""}
        </div>
      )}

      {!hasMoreData && events.length > 0 && (
        <div className="text-xl text-center align-middle p-10 text-gray-600">
          No more data...
        </div>
      )}
    </div>
  );
};

export default EventList;
