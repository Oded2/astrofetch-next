"use client";

import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import clsx from "clsx";
import { generateRandomId } from "@/lib/helpers";

interface Props<T, K> {
  value: T;
  setValue: (newValue: T) => void;
  min?: K;
  max?: K;
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
}: Props<Date, Date>) {
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
          hidden={min ? { before: min, after: max } : []}
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

export function CheckBox({
  value,
  setValue,
  join,
  label,
}: Props<boolean, number>) {
  return (
    <fieldset className="fieldset px-2 py-1 border border-base-300 rounded-box h-full">
      <label className="fieldset-label">
        <input
          type="checkbox"
          defaultChecked={value}
          className={clsx("checkbox", join && "join-item")}
          onChange={() => setValue(!value)}
        />
        <span className="select-none">{label}</span>
      </label>
    </fieldset>
  );
}
