import { allowedExtensions } from "@/lib/constants";
import { formatDate } from "@/lib/helpers";
import type { ApodData } from "@/lib/types";
import Image from "next/image";

interface Props {
  data: ApodData;
  onView: () => void;
  onShare: () => void;
  id?: string;
}

export function ApodCard({ data, onShare, onView, id }: Props) {
  let imgSrc = data.thumbnail_url ?? data.url ?? "/images/no-image.jpg";
  if (!allowedExtensions.some((val) => imgSrc.endsWith(val)))
    imgSrc = "/images/no-image.jpg";
  return (
    <div
      className="card bg-base-300 shadow hover:shadow-lg transition-shadow h-full relative group"
      id={id}
    >
      <figure className="relative aspect-square">
        <Image
          src={imgSrc}
          alt={data.title}
          className="object-cover group-hover:scale-110 transition-transform duration-300"
          fill
          sizes="95vw"
        ></Image>
      </figure>
      <div className="card-body">
        <h2 className="card-title">{data.title}</h2>
        <h3 className="font-medium ">{formatDate(new Date(data.date))}</h3>
        <p className="line-clamp-3 sm:line-clamp-6 md:line-clamp-8">
          {data.explanation}
        </p>
        <div className="card-actions justify-end mt-1">
          <button onClick={onShare} className="btn btn-neutral">
            Share
          </button>
          <button onClick={onView} className="btn btn-primary">
            View
          </button>
        </div>
      </div>
    </div>
  );
}
