"use client";

import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import clsx from "clsx";
import { generateRandomId } from "@/lib/helpers";

interface Props {
  value: Date;
  setValue: (newValue: Date) => void;
  min: Date;
  max: Date;
  join?: boolean;
  label?: string;
}

export function DatePicker({
  value,
  setValue,
  min,
  max,
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
          hidden={{ before: min, after: max }}
          startMonth={min}
          endMonth={max}
          footer={label && <span className="px-4">{label}</span>}
          captionLayout="dropdown"
          className="react-day-picker"
          mode="single"
          required
          selected={value}
          onSelect={setValue}
        />
      </div>
    </div>
  );
}
