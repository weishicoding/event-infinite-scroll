import Image from "next/image";
import React from "react";
import { getLocalizedContent, currentLanguage } from "@/app/lib/language";
import { Event } from "../lib/type";
import { format } from "date-fns";
import Link from "next/link";

// setting a defult image because some event has no image to cause error for Image
const DEFAULT_IMAGE =
  "https://suiterc.icareus.com/image/image_gallery?img_id=16158003";
const EventItem: React.FC<Event> = (event) => {
  const date = format(new Date(event.startTime), "dd.MM.yyyy HH:mm:ss");
  return (
    <Link href={`/event/${event.eventId}`}>
      <div className="rounded-3xl overflow-hidden bg-white shadow-sm">
        <div className="relative h-50 lg:h-55 md:h-50">
          <Image
            src={event.thumbnailImage || DEFAULT_IMAGE}
            alt={getLocalizedContent(event.name, currentLanguage)}
            fill
            className="object-cover"
          />
        </div>
        <div className="px-4 py-8">
          <h3 className="font-bold text-lg cursor-pointer hover:underline">
            {getLocalizedContent(event.name, currentLanguage)}
          </h3>
          <p className="text-gray-600 mt-4">{date}</p>
        </div>
      </div>
    </Link>
  );
};

export default EventItem;
