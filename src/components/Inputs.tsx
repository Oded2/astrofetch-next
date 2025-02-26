"use client";
import { useEffect, useRef } from "react";
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
  useEffect(() => {
    if (join) btn.current?.classList.add("join-item");
  }, []);
  // Can only be used after load
  return (
    <>
      <button
        ref={btn}
        popoverTarget="rdp-popover"
        className="input"
        style={{ anchorName: "--rdp" } as React.CSSProperties}
      >
        {value ? value.toLocaleDateString() : "Pick a date"}
      </button>

      <div
        popover="auto"
        id="rdp-popover"
        className="dropdown"
        style={{ positionAnchor: "--rdp" } as React.CSSProperties}
      >
        <DayPicker
          hidden={min ? { before: min, after: max } : []}
          captionLayout="dropdown"
          className="react-day-picker"
          mode="single"
          selected={value}
          required
          onSelect={setValue}
        />
      </div>
    </>
  );
}
