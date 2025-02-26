import { addParams, getEnv } from "@/lib/helpers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Temporary return value in order to prevent unnecessary requests while testing
  const temp = {
    copyright: "\\nTim White\\n",
    date: "2024-12-24",
    explanation: "What do ts",
    hdurl: "https://apod.nasa.gov/apod/image/2412/ConeTree_White_2154.jpg",
    media_type: "image",
    service_version: "v1",
    title: "Fox Fur, Cone, and Christmas Tree",
    url: "https://apod.nasa.gov/apod/image/2412/ConeTree_White_960.jpg",
  };
  return NextResponse.json(temp);
  //   const endpoint = "https://api.nasa.gov/planetary/apod";
  //   const { searchParams } = new URL(request.url);
  //   const start = searchParams.get("start");
  //   const end = searchParams.get("end");
  //   const apiKey = getEnv("API_KEY");
  //   if (!apiKey)
  //     return NextResponse.json({ error: "Missing API Key" }, { status: 500 });
  //   if (!start || !end)
  //     return NextResponse.json({ error: "Missing Dates" }, { status: 400 });
  //   const params: Record<string, string> =
  //     start === end ? { date: start } : { start_date: start, end_date: end };
  //   const url = addParams(endpoint, { api_key: apiKey, ...params });
  //   const response = await fetch(url);
  //   if (!response.ok)
  //     return NextResponse.json(
  //       { error: "API Error" },
  //       { status: response.status, statusText: response.statusText }
  //     );
  //   return NextResponse.json(await response.json());
}
