import { addParams, validateDates } from "@/lib/helpers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const endpoint = "https://api.nasa.gov/planetary/apod";
  const { searchParams } = new URL(request.url);
  const start = searchParams.get("start");
  const end = searchParams.get("end");
  const apiKey = process.env.API_KEY;
  if (!apiKey)
    return NextResponse.json({ error: "Missing API Key" }, { status: 500 });
  if (!start || !end)
    return NextResponse.json({ error: "Missing Dates" }, { status: 400 });
  const params: Record<string, string> =
    start === end ? { date: start } : { start_date: start, end_date: end };
  const url = addParams(endpoint, {
    api_key: apiKey,
    thumbs: "true",
    ...params,
  });
  const valid = validateDates(new Date(start), new Date(end));
  if (valid.length > 0)
    return NextResponse.json({ error: valid }, { status: 422 });
  console.log("Fetching external API");
  const response = await fetch(url);
  if (!response.ok)
    return NextResponse.json(
      { error: "API Error" },
      { status: response.status, statusText: response.statusText }
    );
  const remaining = response.headers.get("x-ratelimit-remaining");
  console.log(
    `NASA API: ${
      remaining ? parseInt(remaining).toLocaleString() : "NaN"
    } remaining requests.`
  );
  return NextResponse.json(await response.json());
}
