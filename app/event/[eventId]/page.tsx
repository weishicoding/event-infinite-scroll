import React from "react";
import { notFound } from "next/navigation";
import { fetchEventDetails } from "@/app/lib/api";
import { Event } from "@/app/lib/type";
import { currentLanguage, getLocalizedContent } from "@/app/lib/language";

export async function EventDetail({ params }: { params: { eventId: string } }) {
  let description = "";
  try {
    const { eventId } = await params;
    const result = await fetchEventDetails(eventId);
    if (!result) {
      notFound();
    }
    const event: Event = result.event;
    description = getLocalizedContent(event.description, currentLanguage);
  } catch (error) {
    notFound();
  }

  return (
    <div
      className="min-h-dvh p-10 bg-cyan-300"
      dangerouslySetInnerHTML={{ __html: description }}
    />
  );
}

export default EventDetail;
