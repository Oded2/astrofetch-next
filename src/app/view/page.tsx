"use client";

import { Container } from "@/components/Container";
import { addParams } from "@/lib/helpers";
import { ApodData } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function View() {
  const [apodData, setApodData] = useState<ApodData | null>(null);
  const params = useSearchParams();
  const date = params.get("date")!;
  const endpoint = addParams("/api", { start: date, end: date });
  useEffect(() => {
    fetch(endpoint).then((res) => res.json().then((json) => setApodData(json)));
  }, []);

  return (
    <Container>
      <div>
        <h1 className="font-bold text-4xl text-center">
          {apodData ? apodData.title : "Loading"}
        </h1>
      </div>
    </Container>
  );
}
