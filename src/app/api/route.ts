import { addParams, getEnv } from "@/lib/helpers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Temporary return value in order to prevent unnecessary requests while testing
  const temp = {
    copyright: "\\nTim White\\n",
    date: "2024-12-24",
    explanation:
      "                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum id aspernatur soluta cupiditate, mollitia voluptatibus tempore. Voluptatibus voluptates delectus distinctio eaque harum velit commodi nihil mollitia? Vero, fuga placeat? Quaerat dicta eius soluta tenetur excepturi optio explicabo, necessitatibus nulla voluptatum neque labore quis officiis amet dolores, sunt saepe consectetur? Dicta nam obcaecati distinctio, ducimus delectus, quasi veniam vero neque aliquid dolorum sapiente quod amet fuga odit doloremque quaerat quos reprehenderit ipsam provident quisquam laboriosam voluptatibus eveniet? Reiciendis architecto ea corporis numquam non, atque dolor nam. Sed quo a numquam voluptatem ab architecto necessitatibus sit facere, explicabo libero consectetur, natus minima eum consequuntur. Tempore nihil hic odio sed expedita unde molestias similique temporibus alias placeat quidem dicta aut at animi veritatis velit magnam officiis minima eveniet, quasi provident vero, vel corporis quam. Magnam voluptatum nulla labore doloremque obcaecati, necessitatibus aliquid magni impedit perferendis in accusamus ut soluta consequuntur exercitationem debitis! Porro excepturi delectus, repellendus asperiores ipsa eos officiis temporibus ex minus quasi illum, voluptates aspernatur odit deserunt voluptate unde id. Facilis earum nesciunt necessitatibus temporibus explicabo minima. Molestias nisi aut eligendi sequi rerum officiis laudantium. Accusamus doloribus quo, exercitationem reprehenderit optio minus ex et nesciunt ullam, asperiores assumenda amet totam quasi!",
    hdurl: "https://apod.nasa.gov/apod/image/2412/ConeTree_White_2154.jpg",
    media_type: "image",
    service_version: "v1",
    title: "Fox Fur, Cone, and Christmas Tree",
    url: "https://apod.nasa.gov/apod/image/2412/ConeTree_White_960.jpg",
  };
  return NextResponse.json(temp);
  //   const endpoint = "https://api.nasa.gov/planetary/apod";
  //   const { searchParams } = new URL(request.url);
  //   const start = searchParams.get("start");
  //   const end = searchParams.get("end");
  //   const apiKey = getEnv("API_KEY");
  //   if (!apiKey)
  //     return NextResponse.json({ error: "Missing API Key" }, { status: 500 });
  //   if (!start || !end)
  //     return NextResponse.json({ error: "Missing Dates" }, { status: 400 });
  //   const params: Record<string, string> =
  //     start === end ? { date: start } : { start_date: start, end_date: end };
  //   const url = addParams(endpoint, { api_key: apiKey, ...params });
  //   const response = await fetch(url);
  //   if (!response.ok)
  //     return NextResponse.json(
  //       { error: "API Error" },
  //       { status: response.status, statusText: response.statusText }
  //     );
  //   return NextResponse.json(await response.json());
}
