"use client";

import { useEffect, useState } from "react";
import { DayPicker, Matcher } from "react-day-picker";
import clsx from "clsx";
import { generateRandomId } from "@/lib/helpers";
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

export function DatePicker({
  date,
  setDate,
  month,
  setMonth,
  join = false,
}: Props) {
  const [id, setId] = useState<string | null>(null);
  useEffect(() => {
    setId(generateRandomId());
  }, []);
  if (id)
    return (
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
            required
            selected={date}
            onSelect={setDate}
            month={month}
            onMonthChange={setMonth}
          />
        </div>
      </div>
    );
  return (
    <button
      className={clsx(
        "input cursor-pointer w-24 justify-center skeleton",
        join && "join-item rounded-none"
      )}
    ></button>
  );
}
