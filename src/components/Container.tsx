import { ReactNode } from "react";

interface Props {
  classname?: string;
  children: ReactNode;
}

export function Container({ classname = "", children }: Props) {
  return (
    <div className={"container mx-auto py-5 " + classname}>{children}</div>
  );
}
