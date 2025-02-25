import { getEnv } from "@/lib/helpers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const start = searchParams.get("start");
  const end = searchParams.get("end");
  const apiKey = getEnv("API_KEY");
}
