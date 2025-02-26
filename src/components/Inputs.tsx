"use client";
import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import clsx from "clsx";

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
  useEffect(() => {
    setLoad(true);
  }, []);
  return (
    <>
      {load && (
        <button
          popoverTarget="rdp-popover"
          className={clsx("input cursor-pointer", join && "join-item")}
          style={{ anchorName: "--rdp" } as React.CSSProperties}
        >
          {value ? value.toLocaleDateString() : "Pick a date"}
        </button>
      )}

      <div
        popover="auto"
        id="rdp-popover"
        className="dropdown"
        style={{ positionAnchor: "--rdp" } as React.CSSProperties}
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
