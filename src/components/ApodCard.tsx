import type { ApodData } from "@/lib/types";

interface Props {
  data: ApodData;
  onView: () => void;
  id?: string;
}

export function ApodCard({ data, onView, id = "apodCard" }: Props) {
  return (
    <div className="card bg-base-300 w-96 shadow-sm h-full" id={id}>
      <figure>
        <img
          className="aspect-square w-full object-cover"
          src={data.thumbnail_url ?? data.url}
          alt={data.title}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{data.title}</h2>
        <p className="line-clamp-12">{data.explanation}</p>
        <div className="card-actions justify-end mt-1">
          <button onClick={onView} className="btn btn-primary">
            View
          </button>
        </div>
      </div>
    </div>
  );
}
