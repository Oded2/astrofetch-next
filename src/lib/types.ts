export type ApodData = {
  copyright: string;
  date: string; // Format: YYYY-MM-DD
  explanation: string;
  media_type: "image" | "video" | "other";
  service_version: string;
  thumbnail_url?: string; // Optional because images may not have it
  title: string;
  url?: string;
};

export type ServerError = {
  message: string;
  status: number;
  statusText: string;
};
