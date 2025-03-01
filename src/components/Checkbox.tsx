"use client";

import clsx from "clsx";

interface Props {
  value: boolean;
  setValue: (newValue: boolean) => void;
  join?: boolean;
  label?: string;
}

export function CheckBox({ value, setValue, join, label }: Props) {
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
