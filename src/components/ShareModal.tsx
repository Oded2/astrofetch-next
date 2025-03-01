import { RefObject, useEffect, useRef, useState } from "react";
import { Modal } from "./Modal";
import { addParams, formatDateISO } from "@/lib/helpers";
import Image from "next/image";
import clsx from "clsx";

interface Props {
  date: Date | null;
  ref: RefObject<HTMLDialogElement | null>;
}

export function ShareModal({ date, ref }: Props) {
  const [url, setUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [qr, setQr] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCopy = async () => {
    if (!url) return;
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
    if (date)
      setUrl(addParams(`${origin}/view`, { date: formatDateISO(date) }));
  }, [date]);

  useEffect(() => {
    if (url) {
      const getQrCode = async () => {
        if (!url) return;
        const response = await fetch(addParams("/api/qrcode", { text: url }));
        const data = await response.json();
        setQr(data["qr"]);
      };
      getQrCode();
    }
  }, [url]);

  return (
    <Modal title="Share" ref={ref}>
      <div className="mb-4 w-full flex items-baseline">
        <div className="w-3/4 pe-2">
          <div className="w-full truncate">
            <span className="whitespace-nowrap">{url}</span>
          </div>
        </div>
        <button onClick={handleCopy} className="btn btn-primary flex-1">
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <div className="divider">OR</div>
      <div className=" text-center">
        <h4 className="font-semibold">Scan QR Code</h4>
        <div
          className={clsx("mt-4 relative w-64 h-64 mx-auto", !qr && "skeleton")}
        >
          {qr && (
            <Image
              src={qr}
              alt="QR Code"
              width={256}
              height={256}
              className="object-contain"
            />
          )}
        </div>
      </div>
    </Modal>
  );
}
