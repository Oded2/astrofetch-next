"use client";
import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";

interface Props<T> {
  value: T;
  setValue: (newValue: T) => void;
  min?: T;
  max?: T;
}

export function DatePicker({ value, setValue, min, max }: Props<Date>) {
  // Can only be used after load
  const today = new Date();
  return (
    <>
      <button
        popoverTarget="rdp-popover"
        className="input input-border"
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
