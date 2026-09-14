import { ImageResponse } from "next/og";
import { book } from "@/lib/site";
export const alt = "De vergeten vader — het boek van Sem de Wachter";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#f2a03d",
        color: "#2e3a63",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "70px",
      }}
    >
      <div
        style={{ display: "flex", fontSize: 24, letterSpacing: 6 }}
      >{`HET BOEK VAN ${book.author.toUpperCase()}`}</div>
      <div
        style={{
          fontSize: 100,
          fontWeight: 700,
          lineHeight: 1.05,
          marginTop: 36,
        }}
      >
        DE VERGETEN VADER
      </div>
      <div style={{ fontSize: 35, marginTop: 28 }}>
        Voor de man naast de buik.
      </div>
      <div style={{ fontSize: 25, marginTop: 32, color: "#982818" }}>
        Humor. Herkenning. Een nieuw hoofdstuk.
      </div>
    </div>,
    size,
  );
}
