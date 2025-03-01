"use client";

import { Viewer } from "@/components/Viewer";
import { addParams } from "@/lib/helpers";
import type { ApodData } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function View() {
  const [apodData, setApodData] = useState<ApodData | null>(null);
  const params = useSearchParams();
  const date = params?.get("date") ?? "2025-01-01";

  useEffect(() => {
    const endpoint = addParams("/api/apod", { start: date, end: date });
    const fetchData = async () => {
      const response = await fetch(endpoint);
      const json = await response.json();
      setApodData(json);
    };
    fetchData();
  }, [date]);

  return <Viewer apodData={apodData} priority></Viewer>;
}

export default function Page() {
  return (
    <Suspense fallback={<span>Loading</span>}>
      <View></View>
    </Suspense>
  );
}
