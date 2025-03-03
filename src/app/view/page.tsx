"use client";

import { ErrorPage } from "@/components/ErrorPage";
import { Viewer } from "@/components/Viewer";
import { addParams } from "@/lib/helpers";
import type { ApodData, ServerError } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
function View() {
  const [apodData, setApodData] = useState<ApodData | null>(null);
  const [error, setError] = useState<ServerError | null>(null);
  const params = useSearchParams();
  const date = params?.get("date") ?? "2025-01-01";

  useEffect(() => {
    const endpoint = addParams("/api/apod", { start: date, end: date });
    const fetchData = async () => {
      const response = await fetch(endpoint);
      const json = await response.json();
      if (!response.ok) {
        setError({
          message: json.error,
          status: response.status,
          statusText: response.statusText,
        });
        return;
      }
      setApodData(json);
    };
    fetchData();
  }, [date]);

  if (error) return <ErrorPage error={error}></ErrorPage>;
  return <Viewer apodData={apodData} priority></Viewer>;
}

export default function Page() {
  return (
    <Suspense fallback={<span>Loading</span>}>
      <View></View>
    </Suspense>
  );
}
