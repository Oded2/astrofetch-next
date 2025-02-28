"use client";

import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import clsx from "clsx";
import { generateRandomId } from "@/lib/helpers";

interface Props<T> {
  value: T;
  setValue: (newValue: T) => void;
  min?: T;
  max?: T;
  join?: boolean;
  footer?: string;
}

export function DatePicker({
  value,
  setValue,
  min,
  max,
  join = false,
  footer = "",
}: Props<Date>) {
  const [load, setLoad] = useState(false);
  const [id, setId] = useState("datepicker");
  useEffect(() => {
    setId(`datepicker-${generateRandomId()}`);
    setLoad(true);
  }, []);
  return (
    <>
      {load && (
        <button
          popoverTarget={id}
          className={clsx("input cursor-pointer", join && "join-item")}
          style={{ anchorName: `--anchor-${id}` } as React.CSSProperties}
        >
          {value ? value.toLocaleDateString() : "Pick a date"}
        </button>
      )}
      <div
        popover="auto"
        id={id}
        className="dropdown"
        style={{ positionAnchor: `--anchor-${id}` } as React.CSSProperties}
      >
        <DayPicker
          hidden={min ? { before: min, after: max } : []}
          footer={<span className="px-4">{footer}</span>}
          captionLayout="dropdown"
          className="react-day-picker"
          mode="single"
          required
          selected={value}
          onSelect={setValue}
        />
      </div>
    </>
  );
}
