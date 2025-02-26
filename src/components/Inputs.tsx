"use client";
import { useEffect, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";

interface Props<T> {
  value: T;
  setValue: (newValue: T) => void;
  min?: T;
  max?: T;
  join?: boolean;
}

export function DatePicker({ value, setValue, min, max, join }: Props<Date>) {
  const btn = useRef<HTMLButtonElement>(null);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    setLoad(true);
  }, []);
  return (
    <>
      {load && (
        <button
          popoverTarget="rdp-popover"
          className={`input ${join ? "join-item" : ""}`}
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
        (
        <DayPicker
          hidden={min ? { before: min, after: max } : []}
          captionLayout="dropdown"
          className="react-day-picker"
          mode="single"
          selected={value}
          required
          onSelect={setValue}
        />
        )
      </div>
    </>
  );
}
