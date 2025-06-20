"use client";

import { ApodCard } from "@/components/ApodCard";
import { CheckBox } from "@/components/Checkbox";
import { Container } from "@/components/Container";
import { DatePicker } from "@/components/DatePicker";
import { Modal } from "@/components/Modal";
import { ShareModal } from "@/components/ShareModal";
import { Viewer } from "@/components/Viewer";
import { postParams } from "@/lib/constants";
import { formatDateISO, validateDates } from "@/lib/helpers";
import type { ApodData } from "@/lib/types";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Range() {
  const [from, setFrom] = useState(() => {
    const initial = new Date();
    initial.setDate(initial.getDate() - 14);
    return initial;
  });
  const [to, setTo] = useState(new Date());
  const [fromMonth, setFromMonth] = useState(new Date(from));
  const [toMonth, setToMonth] = useState(new Date());
  const [apods, setApods] = useState<ApodData[]>([]);
  const [inProgress, setInProgress] = useState(false);
  const [current, setCurrent] = useState<ApodData | null>(null);
  const [shareDate, setShareDate] = useState<Date | null>(null);
  const [returnId, setReturnId] = useState("");
  const modal = useRef<HTMLDialogElement>(null);
  const shareModal = useRef<HTMLDialogElement>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [dynamicTo, setDynamicTo] = useState(true);
  const [showWarning, setShowWarning] = useState(false);

  const fetchData = async () => {
    if (inProgress) return;
    const [status, message] = validateDates(from, to);
    if (status != 200) {
      setErrorMessage(message);
      return;
    }
    setInProgress(true);
    const response = await fetch("/api/apod", {
      ...postParams,
      body: JSON.stringify({
        start: formatDateISO(from),
        end: formatDateISO(to),
      }),
    });
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

  const onShare = (index: number) => {
    setShareDate(new Date(apods[index].date));
    shareModal.current?.showModal();
  };

  const onBack = () => {
    setCurrent(null);
  };

  useEffect(() => {
    if (errorMessage) modal.current?.showModal();
  }, [errorMessage]);

  useEffect(() => {
    if (!current) {
      document
        .getElementById(returnId)
        ?.scrollIntoView({ behavior: "instant", block: "center" });
    }
  }, [current, returnId]);

  useEffect(() => {
    const current = modal.current;
    const handleClose = () => setErrorMessage("");
    current?.addEventListener("close", handleClose);
    return () => current?.removeEventListener("close", handleClose);
  }, [modal]);

  useEffect(() => {
    if (dynamicTo) {
      const today = new Date();
      const temp = new Date(from);
      temp.setMonth(from.getMonth() + 1);
      const final = temp > today ? today : temp;
      setTo(final);
      setToMonth(final);
    }
  }, [dynamicTo, from]);

  useEffect(() => {
    // Check to see if the range is greater than a year in miliseconds
    setShowWarning(to.getTime() - from.getTime() > 31556952000);
  }, [to, from]);

  return (
    <>
      {!current && (
        <Container>
          <div className="sticky top-0 z-10 py-5 bg-base-100 flex flex-col gap-2">
            <Link href="/" className="btn print:hidden me-auto">
              Home
            </Link>
            <div className="flex flex-wrap items-center gap-2">
              <span className="label">FROM</span>
              <DatePicker
                date={from}
                setDate={setFrom}
                month={fromMonth}
                setMonth={setFromMonth}
              ></DatePicker>
              <span className="label">TO</span>
              <DatePicker
                date={to}
                setDate={setTo}
                month={toMonth}
                setMonth={setToMonth}
              ></DatePicker>
              <button onClick={fetchData} className="btn btn-primary w-20">
                {inProgress && (
                  <span className="loading loading-spinner"></span>
                )}
                {!inProgress && <span>Fetch</span>}
              </button>
              <CheckBox
                value={dynamicTo}
                setValue={setDynamicTo}
                label="Dynamically update range"
              ></CheckBox>
            </div>
            {showWarning && (
              <span className="font-light text-sm italic">
                A large date range may result in longer load times.
              </span>
            )}
          </div>
          <div className="grid justify-center md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 mt-10">
            {apods.map((item, index) => {
              return (
                <ApodCard
                  key={index}
                  data={item}
                  onView={() => onView(index)}
                  onShare={() => onShare(index)}
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
      <ShareModal date={shareDate} ref={shareModal}></ShareModal>
    </>
  );
}
