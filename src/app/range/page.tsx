"use client";

import { ApodCard } from "@/components/ApodCard";
import { Container } from "@/components/Container";
import { CheckBox, DatePicker } from "@/components/Inputs";
import { Modal } from "@/components/Modal";
import { Viewer } from "@/components/Viewer";
import { minDate } from "@/lib/constants";
import {
  addParams,
  formatDate,
  formatDateISO,
  validateDates,
} from "@/lib/helpers";
import type { ApodData } from "@/lib/types";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Range() {
  const fromPointer = new Date();
  const [from, setFrom] = useState(fromPointer);
  const [to, setTo] = useState(new Date());
  const [apods, setApods] = useState<ApodData[]>([]);
  const [inProgress, setInProgress] = useState(false);
  const [current, setCurrent] = useState<ApodData | null>(null);
  const [returnId, setReturnId] = useState("");
  const modal = useRef<HTMLDialogElement>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [dynamicTo, setDynamicTo] = useState(true);

  fromPointer.setDate(new Date().getDate() - 14);

  const fetchData = async () => {
    if (inProgress) return;
    const valid = validateDates(from, to);
    if (valid.length > 0) {
      setErrorMessage(valid);
      return;
    }
    setInProgress(true);
    const endpoint = addParams("/api/apod", {
      start: formatDateISO(from),
      end: formatDateISO(to),
    });
    const response = await fetch(endpoint);
    if (!response.ok) {
      setErrorMessage("Error fetching API");
      setInProgress(false);
      return;
    }
    const json = (await response.json()) as ApodData[];
    setApods(json);
    setInProgress(false);
  };

  const onView = (index: number) => {
    setCurrent(apods[index]);
    setReturnId(`apod-${index}`);
  };

  const onBack = () => {
    setCurrent(null);
  };

  useEffect(() => {
    if (errorMessage.length > 0) modal.current?.showModal();
  }, [errorMessage]);

  useEffect(() => {
    if (!current) {
      document
        .getElementById(returnId)
        ?.scrollIntoView({ behavior: "instant", block: "center" });
    }
  }, [current, returnId]);

  useEffect(() => {
    modal.current?.addEventListener("close", () => setErrorMessage(""));
  }, [modal]);

  useEffect(() => {
    if (dynamicTo) {
      const today = new Date();
      const temp = new Date(from);
      temp.setMonth(from.getMonth() + 1);
      setTo(temp > today ? today : temp);
    }
  }, [dynamicTo, from]);

  return (
    <>
      {!current && (
        <Container>
          <Link href="/" className="btn">
            Home
          </Link>
          <div className="mt-2 flex items-center gap-2">
            <span className="label">FROM</span>
            <DatePicker
              value={from}
              setValue={setFrom}
              min={minDate}
              max={new Date()}
            ></DatePicker>
            <span className="label">TO</span>
            <DatePicker
              value={to}
              setValue={setTo}
              min={minDate}
              max={new Date()}
            ></DatePicker>
            <button onClick={fetchData} className="btn btn-primary">
              {inProgress && <span className="loading loading-spinner"></span>}
              {!inProgress && <span>Fetch</span>}
            </button>
            <CheckBox
              value={dynamicTo}
              setValue={setDynamicTo}
              label="Dynamically update range"
            ></CheckBox>
          </div>
          <span className="italic font-light text-sm">{`Dates must be between ${formatDate(
            minDate
          )} and today`}</span>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-8 gap-y-8 mt-10">
            {apods.map((item, index) => {
              return (
                <ApodCard
                  key={index}
                  data={item}
                  onView={() => onView(index)}
                  id={`apod-${index}`}
                ></ApodCard>
              );
            })}
          </div>
        </Container>
      )}
      {current && <Viewer apodData={current} onBack={onBack}></Viewer>}

      <Modal title="Error" ref={modal}>
        <p>{errorMessage}</p>
      </Modal>
    </>
  );
}
