"use client";

import { Container } from "@/components/Container";
import { addParams } from "@/lib/helpers";
import { ApodData } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function View({}) {
  const [apodData, setApodData] = useState<ApodData | null>(null);
  const [mediaUrl, setMediaUrl] = useState<string>("/images/1x1.png");
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
      <div className="bg-gray-950 h-screen relative font-playfair">
        <div
          style={{
            backgroundImage: `url(${mediaUrl})`,
          }}
          className="absolute inset-0 bg-cover bg-center before:absolute before:inset-0 before:backdrop-blur-lg before:bg-black/30 opacity-70"
        ></div>
        <div className="relative max-h-full">
          <Container>
            <div className="flex flex-col h-[400px]">
              <h1 className="font-bold text-4xl text-center">
                {apodData?.title ?? "Loading..."}
              </h1>

              <div className="flex h-1/2 overflow-hidden">
                <div>
                  <img
                    src={mediaUrl}
                    alt={apodData?.title ?? "Blank"}
                    className="h-full"
                  />
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </main>
  );
}
