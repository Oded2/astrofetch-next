import type { Matcher } from "react-day-picker";

export const minDate = new Date(1995, 5, 16, 0, 0, 0);
export const allowedExtensions = [".png", ".jpg", ".jpeg", ".gif"];
// APOD doesn't exist on these days
export const hiddenDays: Matcher[] = [
  { after: minDate, before: new Date(1995, 5, 20, 0, 0, 0) },
];
