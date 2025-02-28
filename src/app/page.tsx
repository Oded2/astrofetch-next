"use client";

import { DatePicker } from "@/components/Inputs";
import { minDate } from "@/lib/constants";
import { formatDateISO } from "@/lib/helpers";
import Link from "next/link";
import { useState } from "react";

const today = new Date();
today.setMinutes(today.getMinutes() + today.getTimezoneOffset() - 60);

export default function Home() {
  const [date, setDate] = useState<Date>(today);

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
          <h1 className="mb-5 text-5xl font-bold">Explore the Stars</h1>
          <p className="mb-5">
            Welcome to AstroFetch. A simple yet effective tool to easily view
            the Astronomy Picture of the Day (APOD).
          </p>
          <Link href="/range" className="btn btn-primary">
            Date Range
          </Link>
          <div className="divider">OR</div>
          <div className="join">
            <DatePicker
              value={date}
              setValue={setDate}
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
