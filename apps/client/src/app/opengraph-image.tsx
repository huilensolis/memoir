import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "About Memoir";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  // Font
  const SatoshiSemiBold = fetch(
    new URL(
      "/public/fonts/satoshi/Fonts/WEB/fonts/Satoshi-Medium.ttf",
      import.meta.url,
    ),
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div tw="bg-neutral-50 w-full h-full flex items-center justify-center flex-col">
        <h1 tw="text-neutral-900 text-6xl max-w-2xl text-center text-balance">
          Start taking notes without distractions. focus in writting, not in the
          tool.
        </h1>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Satoshi",
          data: await SatoshiSemiBold,
          style: "normal",
          weight: 600,
        },
      ],
    },
  );
}
