import type { ApodData } from "@/lib/types";
import { Container } from "./Container";
import Link from "next/link";
import { addParams, formatDate } from "@/lib/helpers";
import { Dropdown } from "./Dropdown";
import { Photo } from "./Photo";
import Image from "next/image";

interface Props {
  apodData: ApodData | null;
  priority?: boolean;
  onBack?: () => void;
}

export function Viewer({ apodData, priority, onBack }: Props) {
  const loadingMessage = "Loading...";
  const url = addParams("/api/image", {
    imageUrl: apodData?.url ?? "",
    filename: apodData?.title ?? "Image",
  });
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
                <h1 className="text-3xl font-bold mb-2">
                  {apodData?.title ?? loadingMessage}
                </h1>
                {apodData && (
                  <h4 className="font-medium my-2">
                    {formatDate(new Date(apodData.date))}
                  </h4>
                )}
                <p>{apodData?.explanation ?? loadingMessage}</p>
                <div className="mt-2 flex flex-col gap-2">
                  {apodData?.copyright && (
                    <span>
                      &copy;&nbsp;
                      {apodData.copyright.replaceAll("\\n", "")}
                    </span>
                  )}
                  <div className="flex gap-2">
                    {onBack && (
                      <button
                        onClick={onBack}
                        className="btn btn-neutral join-item"
                      >
                        Back
                      </button>
                    )}
                    {!onBack && (
                      <Link href="/" className="btn btn-neutral join-item">
                        Home
                      </Link>
                    )}
                    {apodData?.media_type === "image" && (
                      <Dropdown label="Options">
                        <li>
                          <a
                            href={apodData.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Open Image
                          </a>
                          <a href={url} download>
                            Download Image
                          </a>
                        </li>
                      </Dropdown>
                    )}
                  </div>
                </div>
              </div>
              {apodData?.url && apodData.media_type === "image" && (
                <Photo
                  src={apodData.url}
                  alt={apodData.title}
                  className="max-h-full object-contain w-full lg:w-auto xl:max-w-4xl 2xl:max-w-5xl lg:min-w-xl xl:min-w-3xl"
                  priority={priority}
                ></Photo>
              )}
              {apodData?.url && apodData.media_type === "video" && (
                <iframe
                  src={apodData.url}
                  title={apodData.title}
                  className="aspect-video h-96 w-full lg:w-auto xl:max-w-4xl 2xl:max-w-5xl my-auto"
                  allowFullScreen
                />
              )}
              {apodData?.media_type === "other" && (
                <Image
                  src="/images/no-image.jpg"
                  alt="No image"
                  className="max-h-full object-contain w-full lg:w-auto xl:max-w-4xl 2xl:max-w-5xl"
                  width={400}
                  height={400}
                  priority={priority}
                ></Image>
              )}
            </div>
          </Container>
        </div>
      </div>
    </main>
  );
}
