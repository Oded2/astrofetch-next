"use client";

import { Container } from "@/components/Container";
import { addParams } from "@/lib/helpers";
import { ApodData } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function View({}) {
  const [apodData, setApodData] = useState<ApodData | null>(null);
  const [mediaUrl, setMediaUrl] = useState<string>("/images/1x1.png");
  const loadingMessage = "Loading...";
  const params = useSearchParams();
  const date = params.get("date") ?? "2025-01-01";
  const endpoint = addParams("/api", { start: date, end: date });
  useEffect(() => {
    if (apodData) setMediaUrl(apodData.url);
  }, [apodData]);
  useEffect(() => {
    fetch(endpoint).then((res) => res.json().then((json) => setApodData(json)));
  }, []);

  return (
    <main>
      <div className="bg-gray-950 min-h-screen relative">
        <div
          style={{
            backgroundImage: `url(${mediaUrl})`,
          }}
          className="absolute inset-0 bg-cover bg-center before:absolute before:inset-0 before:backdrop-blur-lg before:bg-black/30 opacity-30"
        ></div>
        <div className="relative min-h-screen h-screen">
          <Container classname="h-full">
            <div className="flex overflow-hidden h-full justify-between gap-8">
              <div className="my-auto">
                <h1 className="text-3xl font-bold mb-2">
                  {apodData?.title ?? loadingMessage}
                </h1>
                <p>{apodData?.explanation ?? loadingMessage}</p>
                <ul className="mt-2 flex gap-1 flex-col">
                  <li>
                    &copy;{" "}
                    {apodData?.copyright?.replaceAll("\\n", "") ??
                      loadingMessage}
                  </li>
                  <li>
                    {apodData &&
                      new Date(apodData.date).toLocaleString("en-US", {
                        day: "numeric",
                        weekday: "long",
                        month: "long",
                        year: "numeric",
                      })}
                  </li>
                </ul>
              </div>
              <img
                src={mediaUrl}
                alt={apodData?.title ?? "Blank"}
                className="max-h-full rounded-lg"
              />
            </div>
          </Container>
        </div>
      </div>
    </main>
  );
}
