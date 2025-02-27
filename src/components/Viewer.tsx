import type { ApodData } from "@/lib/types";
import { Container } from "./Container";
import Link from "next/link";

interface Props {
  apodData: ApodData | null;
}

export function Viewer({ apodData }: Props) {
  const loadingMessage = "Loading...";
  return (
    <main>
      <div className="bg-gray-950 min-h-screen relative">
        {apodData && (
          <div
            style={{
              backgroundImage: `url(${apodData.thumbnail_url ?? apodData.url})`,
            }}
            className="absolute inset-0 bg-cover bg-center before:absolute before:inset-0 before:backdrop-blur-lg before:bg-black/30 opacity-30"
          />
        )}
        <div className="relative min-h-screen h-screen">
          <Container className="h-full">
            <div className="flex flex-col-reverse lg:flex-row overflow-hidden h-full justify-between gap-8">
              <div className="my-auto">
                <h1 className="text-3xl font-bold mb-2">
                  {apodData?.title ?? loadingMessage}
                </h1>
                <p>{apodData?.explanation ?? loadingMessage}</p>
                <div className="mt-2 flex flex-col gap-2">
                  {apodData?.copyright && (
                    <span>
                      &copy;&nbsp;
                      {apodData.copyright.replaceAll("\\n", "") ??
                        loadingMessage}
                    </span>
                  )}
                  <span>
                    {apodData &&
                      new Date(apodData.date).toLocaleString("en-US", {
                        day: "numeric",
                        weekday: "long",
                        month: "long",
                        year: "numeric",
                      })}
                  </span>
                  <div>
                    <Link href="/" className="btn btn-neutral">
                      Home
                    </Link>
                  </div>
                </div>
              </div>
              {apodData && apodData.media_type === "image" && (
                <img
                  src={apodData.url}
                  alt={apodData?.title ?? "Blank"}
                  className="max-h-full object-contain w-full lg:w-auto xl:max-w-4xl 2xl:max-w-5xl shadow"
                />
              )}
              {apodData && apodData.media_type === "video" && (
                <iframe
                  src={apodData.url}
                  title={apodData?.title ?? "Blank"}
                  className="aspect-video h-96 w-full lg:w-auto xl:max-w-4xl 2xl:max-w-5xl shadow my-auto"
                  allowFullScreen
                />
              )}
            </div>
          </Container>
        </div>
      </div>
    </main>
  );
}
