import type { ApodData } from "@/lib/types";
import { RefObject } from "react";

interface Props {
  data: ApodData;
  onView: () => void;
}

export function ApodCard({ data, onView }: Props) {
  return (
    <div className="card bg-base-300 w-96 shadow-sm h-full">
      <figure>
        <img
          className="aspect-square w-full object-cover"
          src={data.thumbnail_url ?? data.url}
          alt={data.title}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{data.title}</h2>
        <p>{data.explanation}</p>
        <div className="card-actions justify-end">
          <button onClick={onView} className="btn btn-primary">
            View
          </button>
        </div>
      </div>
    </div>
  );
}
