"use client";

import { Container } from "@/components/Container";
import { Viewer } from "@/components/Viewer";
import { addParams } from "@/lib/helpers";
import type { ApodData } from "@/lib/types";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useMemo, Suspense } from "react";

function View() {
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

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <View />
    </Suspense>
  );
}
