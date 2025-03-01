import { RefObject, useEffect, useRef, useState } from "react";
import { Modal } from "./Modal";
import { addParams, formatDateISO } from "@/lib/helpers";

interface Props {
  date: Date;
  ref: RefObject<HTMLDialogElement | null>;
}

export function ShareModal({ date, ref }: Props) {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setCopied(true);
      timeoutRef.current = setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const origin = window.location.origin;
    setUrl(addParams(`${origin}/view`, { date: formatDateISO(date) }));
  }, [date]);

  return (
    <Modal title="Share" ref={ref}>
      <div className="my-4 w-full flex items-baseline">
        <div className="w-3/4 pe-2">
          <div className="w-full truncate">
            <span className="whitespace-nowrap">{url}</span>
          </div>
        </div>
        <button onClick={handleCopy} className="btn btn-primary flex-1">
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </Modal>
  );
}
