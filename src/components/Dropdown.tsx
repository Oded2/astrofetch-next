import { ReactNode } from "react";

interface Props {
  label: string;
  children: ReactNode;
}

export function Dropdown({ label, children }: Props) {
  return (
    <div className="dropdown join-item">
      <div tabIndex={0} role="button" className="btn btn-neutral">
        {label}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
      >
        {children}
      </ul>
    </div>
  );
}
