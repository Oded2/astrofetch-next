"use client";

import { ApodCard } from "@/components/ApodCard";
import { CheckBox } from "@/components/Checkbox";
import { Container } from "@/components/Container";
import { DatePicker } from "@/components/DatePicker";
import { Modal } from "@/components/Modal";
import { ShareModal } from "@/components/ShareModal";
import { Viewer } from "@/components/Viewer";
import { minDate } from "@/lib/constants";
import {
  addParams,
  createSafeDate,
  formatDateISO,
  validateDates,
} from "@/lib/helpers";
import type { ApodData } from "@/lib/types";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const todaySafe = createSafeDate();

export default function Range() {
  const [from, setFrom] = useState(() => {
    const initial = createSafeDate();
    initial.setDate(initial.getDate() - 14);
    return initial;
  });
  const [to, setTo] = useState(createSafeDate());
  const [apods, setApods] = useState<ApodData[]>([]);
  const [inProgress, setInProgress] = useState(false);
  const [current, setCurrent] = useState<ApodData | null>(null);
  const [shareDate, setShareDate] = useState<Date | null>(null);
  const [returnId, setReturnId] = useState("");
  const modal = useRef<HTMLDialogElement>(null);
  const shareModal = useRef<HTMLDialogElement>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [dynamicTo, setDynamicTo] = useState(true);

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
      const today = createSafeDate();
      const temp = createSafeDate(from);
      temp.setMonth(from.getMonth() + 1);
      setTo(temp > today ? today : temp);
    }
  }, [dynamicTo, from]);

  return (
    <>
      {!current && (
        <Container>
          <Link href="/" className="hidden sm:btn">
            Home
          </Link>
          <div className="mt-2 flex flex-col sm:flex-row items-center gap-2">
            <Link href="/" className="btn sm:hidden">
              Home
            </Link>
            <span className="label">FROM</span>
            <DatePicker
              value={from}
              setValue={setFrom}
              min={minDate}
              max={todaySafe}
            ></DatePicker>
            <span className="label">TO</span>
            <DatePicker
              value={to}
              setValue={setTo}
              min={minDate}
              max={todaySafe}
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
          <div className="grid justify-center md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 mt-10">
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
