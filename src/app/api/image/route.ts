// src/app/api/image/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const imageUrl = searchParams.get("imageUrl");
  const filename = searchParams.get("filename") ?? "downloaded_image";

  if (!imageUrl) {
    return NextResponse.json(
      { error: "Missing imageUrl parameter" },
      { status: 400 }
    );
  }

  try {
    // Fetch the image from the external URL
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch the image");
    }
    // Get the content type
    const contentType = response.headers.get("Content-Type") || "image/jpeg";
    console.log(response.headers.get("Content-Type"));
    // Determine the correct file extension
    let extension = "";
    if (contentType.includes("jpeg")) extension = ".jpeg";
    else if (contentType.includes("png")) extension = ".png";
    else if (contentType.includes("gif")) extension = ".gif";
    else extension = ".jpg"; // Default
    // Convert the image to an ArrayBuffer
    const imageBuffer = await response.arrayBuffer();
    // Set headers and return response
    return new NextResponse(Buffer.from(imageBuffer), {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${filename}${extension}"`,
      },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Failed to fetch the image." },
      { status: 500 }
    );
  }
}
