import { ImageResponse } from "next/og";

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          background: "#0a0a0a",
          color: "#2dd4bf",
          fontSize: 16,
          fontWeight: 700,
          fontFamily: "monospace",
        }}
      >
        MC
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  );
}
