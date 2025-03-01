import { ReactNode } from "react";

interface Props {
  className?: string;
  children: ReactNode;
}

export function Container({ className = "", children }: Props) {
  const finalClassname = className ? ` ${className}` : "";
  return (
    <div className={"container mx-auto p-5" + finalClassname}>{children}</div>
  );
}
