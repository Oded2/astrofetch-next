import { ReactNode, RefObject } from "react";

interface Props {
  title?: string;
  children: ReactNode;
  ref: RefObject<HTMLDialogElement | null>;
}

export function Modal({ title, ref, children }: Props) {
  return (
    <dialog ref={ref} className="modal">
      <div className="modal-box">
        {title && <h3 className="font-bold text-lg">{title}</h3>}
        {children}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
