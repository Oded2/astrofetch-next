export type ApodData = {
  copyright?: string; // Optional, as some APOD entries might not have it
  date: string; // YYYY-MM-DD format
  explanation: string;
  hdurl?: string; // Optional, since not all entries have an HD image
  media_type: string; // Usually "image" or "video"
  service_version: string;
  title: string;
  url: string;
};
