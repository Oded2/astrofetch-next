"use client";

import { Viewer } from "@/components/Viewer";
import { addParams } from "@/lib/helpers";
import type { ApodData } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useMemo, Suspense } from "react";

function View() {
  const [apodData, setApodData] = useState<ApodData | null>(null);
  const params = useSearchParams();
  const date = params?.get("date") ?? "2025-01-01";
  const endpoint = useMemo(
    () => addParams("/api/apod", { start: date, end: date }),
    [date]
  );

  useEffect(() => {
    fetch(endpoint)
      .then((res) => res.json())
      .then((json) => setApodData(json));
  }, [endpoint]);

  return <Viewer apodData={apodData} priority></Viewer>;
}

export default function Page() {
  return (
    <Suspense fallback={<span>Loading</span>}>
      <View></View>
    </Suspense>
  );
}
