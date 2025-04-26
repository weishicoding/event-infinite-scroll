import { LanguageContent } from "./language";

export interface Event {
  eventId: string;
  name: LanguageContent;
  thumbnailImage: string;
  startTime: number;
  description: LanguageContent;
}
