"use client";

import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import clsx from "clsx";
import { generateRandomId } from "@/lib/helpers";
import { hiddenDays, minDate } from "@/lib/constants";

interface Props {
  date: Date;
  setDate: (newDate: Date) => void;
  month?: Date;
  setMonth?: (newMonth: Date) => void;
  join?: boolean;
  label?: string;
}

const max = new Date();

export function DatePicker({
  date,
  setDate,
  month,
  setMonth,
  join = false,
  label,
}: Props) {
  const [load, setLoad] = useState(false);
  const [id, setId] = useState("datepicker");
  useEffect(() => {
    setId(`datepicker-${generateRandomId()}`);
    setLoad(true);
  }, []);
  return (
    <div className="flex">
      {load && (
        <button
          popoverTarget={id}
          className={clsx(
            "input cursor-pointer w-24 justify-center",
            join && "join-item"
          )}
          style={{ anchorName: `--anchor-${id}` } as React.CSSProperties}
        >
          {date ? date.toLocaleDateString() : "Pick a date"}
        </button>
      )}
      <div
        popover="auto"
        id={id}
        className="dropdown"
        style={{ positionAnchor: `--anchor-${id}` } as React.CSSProperties}
      >
        <DayPicker
          hidden={[{ before: minDate, after: max }, ...hiddenDays]}
          startMonth={minDate}
          endMonth={max}
          footer={label && <span className="px-4">{label}</span>}
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
}
