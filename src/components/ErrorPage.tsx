import { ServerError } from "@/lib/types";
import Link from "next/link";

interface Props {
  error: ServerError;
}

export function ErrorPage({ error }: Props) {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-2">
      <h1 className="text-4xl font-bold">{`${error.status} ${error.statusText}`}</h1>
      <h2 className="text-2xl font-semibold">{error.message}</h2>
      <Link href="/" className="btn btn-primary">
        Return Home
      </Link>
    </div>
  );
}
