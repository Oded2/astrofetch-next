"use client";

import { Viewer } from "@/components/Viewer";
import { addParams } from "@/lib/helpers";
import type { ApodData } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";

export default function View() {
  const [apodData, setApodData] = useState<ApodData | null>(null);
  const params = useSearchParams();
  const date = params?.get("date") ?? "2025-01-01";
  const endpoint = useMemo(
    () => addParams("/api", { start: date, end: date }),
    [date]
  );

  useEffect(() => {
    fetch(endpoint)
      .then((res) => res.json())
      .then((json) => setApodData(json));
  }, [endpoint]);

  return Viewer({ apodData: apodData });
}
