import { NextResponse } from "next/server";
import { toDataURL } from "qrcode";

export async function GET(request: Request) {
  console.log("Creating QR Code");
  const { searchParams } = new URL(request.url);
  const text = searchParams.get("text");
  if (!text)
    return NextResponse.json({ error: "Text not defined" }, { status: 400 });
  try {
    const qrDataURL = await toDataURL(text, {
      width: 256,
    });
    return NextResponse.json({ qr: qrDataURL });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to generate QR Code" },
      { status: 500 }
    );
  }
}
