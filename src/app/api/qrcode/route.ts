import { NextResponse } from "next/server";
import { toDataURL } from "qrcode";

export async function POST(request: Request) {
  console.log("Creating QR Code");
  const { text }: { text?: string } = await request.json();
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
