import { addParams, validateDates } from "@/lib/helpers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const endpoint = "https://api.nasa.gov/planetary/apod";
  const body = await request.json();
  const { start, end }: { start?: string; end?: string } = body;
  if (!start || !end)
    return NextResponse.json({ error: "Missing Dates" }, { status: 400 });
  const apiKey = process.env.API_KEY;
  if (!apiKey)
    return NextResponse.json({ error: "Missing API Key" }, { status: 500 });
  const params: Record<string, string> =
    start === end ? { date: start } : { start_date: start, end_date: end };
  const url = addParams(endpoint, {
    api_key: apiKey,
    thumbs: "true",
    ...params,
  });
  const [status, message] = validateDates(new Date(start), new Date(end));
  if (status != 200)
    return NextResponse.json({ error: message }, { status: status });
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
  return NextResponse.json(await response.json(), {
    headers: { "Cache-Control": "no-store" },
  });
}
