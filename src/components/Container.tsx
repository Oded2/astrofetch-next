import { ReactNode } from "react";

interface Props {
  className?: string;
  children: ReactNode;
}

export function Container({ className = "", children }: Props) {
  const finalClassname = className ? ` ${className}` : "";
  return (
    <div className={"container mx-auto px-5 sm:px-0" + finalClassname}>
      {children}
    </div>
  );
}
