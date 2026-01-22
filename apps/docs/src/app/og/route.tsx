import { ImageResponse } from "next/og";
import { generate as DefaultImage } from "fumadocs-ui/og";

export const revalidate = false;

export async function GET(_req: Request) {
  const searchParams = new URL(_req.url).searchParams;

  const title = searchParams.get("title") ?? "Monicon";
  const description =
    searchParams.get("description") ??
    "Monicon is an easy-to-use icon orchestration tool that makes adding icons to your projects simple.";

  return new ImageResponse(
    (
      <DefaultImage
        title={title}
        description={description}
        primaryColor="#403c3b"
        primaryTextColor="white"
      />
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
