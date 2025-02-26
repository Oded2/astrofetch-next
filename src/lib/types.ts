export type ApodData = {
  copyright: string;
  date: string; // Format: YYYY-MM-DD
  explanation: string;
  media_type: "image" | "video"; // APOD typically has either "image" or "video"
  service_version: string;
  thumbnail_url?: string; // Optional because images may not have it
  title: string;
  url: string;
};
