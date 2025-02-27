"use client";

import { ApodCard } from "@/components/ApodCard";
import { Container } from "@/components/Container";
import { DatePicker } from "@/components/Inputs";
import { Viewer } from "@/components/Viewer";
import { addParams, formatDateISO } from "@/lib/helpers";
import type { ApodData } from "@/lib/types";
import { useState } from "react";

export default function Range() {
  const today = new Date();
  const fromPointer = new Date();
  const [from, setFrom] = useState(fromPointer);
  const [to, setTo] = useState(new Date());
  const [apods, setApods] = useState<ApodData[]>([]);
  const [inProgress, setInProgress] = useState(false);
  const [current, setCurrent] = useState<ApodData | null>(null);

  fromPointer.setDate(today.getDate() - 14);

  const fetchData = async () => {
    if (inProgress) return;
    setInProgress(true);
    const endpoint = addParams("/api", {
      start: formatDateISO(from),
      end: formatDateISO(to),
    });
    const response = await fetch(endpoint);
    if (!response.ok) {
      console.error(response.status, response.statusText);
      setInProgress(false);
      return;
    }
    const json = (await response.json()) as ApodData[];
    setApods(json);
    setInProgress(false);
  };

  const onView = (index: number) => {
    setCurrent(apods[index]);
  };

  const onBack = () => {
    setCurrent(null);
  };

  return (
    <div>
      {!current && (
        <Container>
          <div className="my-10 flex gap-2 max-w-sm">
            <span className="label">FROM</span>
            <DatePicker value={from} setValue={setFrom}></DatePicker>
            <span className="label">TO</span>
            <DatePicker value={to} setValue={setTo}></DatePicker>
            <button onClick={fetchData} className="btn btn-primary">
              {inProgress && <span className="loading loading-spinner"></span>}
              {!inProgress && <span>Fetch</span>}
            </button>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            {apods.map((item, index) => {
              return (
                <ApodCard
                  key={index}
                  data={item}
                  onView={() => onView(index)}
                ></ApodCard>
              );
            })}
          </div>
        </Container>
      )}
      {current && <Viewer apodData={current} onBack={onBack}></Viewer>}
    </div>
  );
}
