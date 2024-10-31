import { NextApiRequest, NextApiResponse } from "next";
import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "edge",
};

const interMedium = fetch(
  new URL("../../public/Inter-Medium.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

const dotPattern = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
  <circle cx="1" cy="1" r="1" fill="rgb(163, 163, 163, 0.3)" />
</svg>
`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const [interMediumFont] = await Promise.all([interMedium]);

  const { searchParams } = new URL(req.url || "", `http://${req.headers.host}`);

  const text = searchParams.get("text") || "Default Text";
  const website = "Monicon";

  return new ImageResponse(
    (
      <div
        style={{
          color: "white",
          backgroundImage: `url('data:image/svg+xml;utf8,${encodeURIComponent(dotPattern)}'), linear-gradient(-165deg, #121212 40%, #000 100%)`,
          backgroundRepeat: "repeat",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "140px 200px 140px 140px",
          fontFamily: "Inter",
          fontWeight: 500,
          fontSize: 80,
        }}
      >
        {text}
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Inter",
          data: interMediumFont,
          style: "normal",
          weight: 500,
        },
      ],
    }
  );
}
