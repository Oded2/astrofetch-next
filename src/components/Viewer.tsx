import type { ApodData } from "@/lib/types";
import { Container } from "./Container";
import Link from "next/link";
import { addParams, formatDate } from "@/lib/helpers";
import { Dropdown } from "./Dropdown";
import { Photo } from "./Photo";
import Image from "next/image";
import { ShareModal } from "./ShareModal";
import { useEffect, useRef, useState } from "react";

interface Props {
  apodData: ApodData | null;
  priority?: boolean;
  onBack?: () => void;
}

export function Viewer({ apodData, priority, onBack }: Props) {
  const shareModal = useRef<HTMLDialogElement>(null);
  const [apodDate, setApodDate] = useState<Date | null>(null);

  const imageDownloadUrl = addParams("/api/image", {
    imageUrl: apodData?.url ?? "",
    filename: apodData?.title ?? "Image",
  });

  const handleShare = () => {
    shareModal.current?.showModal();
  };

  useEffect(() => {
    if (apodData) {
      setApodDate(new Date(apodData.date));
    }
  }, [apodData]);

  const renderMedia = () => {
    if (!apodData) {
      return (
        <div className="skeleton h-96 w-full lg:h-full lg:w-auto xl:max-w-4xl 2xl:max-w-5xl lg:min-w-xl xl:min-w-3xl 2xl:min-w-4xl my-auto"></div>
      );
    }
    if (apodData.media_type === "image" && apodData.url) {
      return (
        <Photo
          src={apodData.url}
          alt={apodData.title}
          className="max-h-full object-contain w-full lg:w-auto xl:max-w-4xl 2xl:max-w-5xl lg:min-w-xl xl:min-w-3xl 2xl:min-w-4xl"
          priority={priority}
        />
      );
    }
    if (
      (apodData.media_type === "video" || apodData.media_type === "other") &&
      apodData.thumbnail_url
    ) {
      return (
        <iframe
          src={apodData.url}
          title={apodData.title}
          className="max-h-full w-full aspect-video lg:max-h-96 lg:my-auto xl:max-w-4xl 2xl:max-w-5xl lg:min-w-xl xl:min-w-3xl 2xl:min-w-4xl"
          allowFullScreen
        />
      );
    }
    return (
      <Image
        src="/images/no-image.jpg"
        alt="No image"
        className="max-h-full object-contain w-full lg:w-auto xl:max-w-4xl 2xl:max-w-5xl"
        width={400}
        height={400}
        priority={priority}
      />
    );
  };

  return (
    <main>
      <div className="bg-gray-950 min-h-screen relative">
        {(apodData?.thumbnail_url || apodData?.url) && (
          <div
            style={{
              backgroundImage: `url(${apodData.thumbnail_url ?? apodData.url})`,
            }}
            className="absolute inset-0 bg-cover bg-center before:absolute before:inset-0 before:backdrop-blur-lg before:bg-black/30 opacity-30"
          />
        )}
        <div className="relative min-h-screen lg:h-screen">
          <Container className="h-full">
            <div className="flex flex-col-reverse lg:flex-row overflow-hidden h-full justify-between gap-8 lg:py-10">
              <div className="my-auto">
                {!apodData && (
                  <h1>
                    <span className="font-bold">Loading</span>
                    <span className="loading loading-dots"></span>
                  </h1>
                )}
                {apodData && (
                  <>
                    <h1 className="text-3xl font-bold mb-2">
                      {apodData.title}
                    </h1>
                    {apodDate && (
                      <h4 className="font-medium my-2">
                        {formatDate(apodDate)}
                      </h4>
                    )}
                    <p>{apodData.explanation}</p>
                    <div className="mt-2 flex flex-col gap-2">
                      {apodData.copyright && (
                        <span>
                          &copy;&nbsp;
                          {apodData.copyright.replaceAll("\\n", "")}
                        </span>
                      )}
                      <div className="flex gap-2 print:hidden">
                        {onBack ? (
                          <button
                            onClick={onBack}
                            className="btn btn-neutral join-item"
                          >
                            Back
                          </button>
                        ) : (
                          <Link href="/" className="btn btn-neutral join-item">
                            Home
                          </Link>
                        )}
                        <Dropdown label="Options">
                          <li>
                            <a
                              href={apodData.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {`Open ${
                                apodData.media_type === "image"
                                  ? "Image"
                                  : "Media"
                              }`}
                            </a>
                          </li>
                          {apodData.media_type === "image" && (
                            <li>
                              <a href={imageDownloadUrl} download>
                                Download Image
                              </a>
                            </li>
                          )}
                          <li>
                            <button onClick={handleShare}>Share</button>
                          </li>
                        </Dropdown>
                      </div>
                    </div>
                  </>
                )}
              </div>
              {/* Render the media content based on apodData */}
              {renderMedia()}
            </div>
          </Container>
        </div>
      </div>
      <ShareModal ref={shareModal} date={apodDate} />
    </main>
  );
}
