"use client";

import { DatePicker } from "@/components/DatePicker";
import { minDate } from "@/lib/constants";
import { createSafeDate, formatDateISO } from "@/lib/helpers";
import Link from "next/link";
import { useState } from "react";

const today = createSafeDate();

export default function Home() {
  const [date, setDate] = useState<Date>(today);
  const repoUrl = process.env.NEXT_PUBLIC_REPOSITORY_URL;

  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: "url(images/background.jpg)",
      }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <div className="mb-5">
            <h1 className="mb-5 text-5xl font-bold">Explore the Stars</h1>
            <p className="mb-1">
              Welcome to AstroFetch. A simple yet effective tool to easily view
              the Astronomy Picture of the Day (APOD).
            </p>
            <a href={repoUrl} className="link" rel="noopener noreferrer">
              Check out the respository
            </a>
          </div>
          <Link href="/range" className="btn btn-primary">
            Date Range
          </Link>
          <div className="divider">OR</div>
          <div className="join">
            <DatePicker
              date={date}
              setDate={setDate}
              min={minDate}
              max={today}
              join
            ></DatePicker>
            <Link
              href={{ pathname: "/view", query: { date: formatDateISO(date) } }}
              className="btn btn-primary join-item"
            >
              Quick Fetch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
