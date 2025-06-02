"use client";

import { useEffect, useState } from "react";
import { DayPicker, Matcher } from "react-day-picker";
import clsx from "clsx";
import { invalidDates, minDate } from "@/lib/constants";

interface Props {
  date: Date;
  setDate: (newDate: Date) => void;
  month?: Date;
  setMonth?: (newMonth: Date) => void;
  join?: boolean;
}

const max = new Date();

// APOD doesn't exist on these days
const hiddenDays: Matcher[] = [
  { before: minDate, after: max },
  ...invalidDates,
];

function generateClientId(): string {
  return Math.random().toString(36).substring(2, 15);
}

export function DatePicker({
  date,
  setDate,
  month,
  setMonth,
  join = false,
}: Props) {
  const [id, setId] = useState<string | null>(null);
  useEffect(() => {
    setId(generateClientId());
  }, []);
  return (
    <>
      {id ? (
        <div className="flex">
          <button
            popoverTarget={`datepicker-${id}`}
            className={clsx(
              "input cursor-pointer w-24 justify-center",
              join && "join-item"
            )}
            style={{ anchorName: `--anchor-${id}` } as React.CSSProperties}
          >
            {date ? date.toLocaleDateString() : "Pick a date"}
          </button>
          <div
            popover="auto"
            id={`datepicker-${id}`}
            className="dropdown"
            style={{ positionAnchor: `--anchor-${id}` } as React.CSSProperties}
          >
            <DayPicker
              hidden={hiddenDays}
              startMonth={minDate}
              endMonth={max}
              captionLayout="dropdown"
              className="react-day-picker"
              mode="single"
              fixedWeeks
              required
              selected={date}
              onSelect={setDate}
              month={month}
              onMonthChange={setMonth}
              styles={{
                dropdown: {
                  color: "#000",
                  backgroundColor: "#fff",
                },
              }}
            />
          </div>
        </div>
      ) : (
        <button
          className={clsx(
            "input cursor-pointer w-24 justify-center skeleton",
            join && "join-item rounded-e-none"
          )}
        ></button>
      )}
    </>
  );
}
