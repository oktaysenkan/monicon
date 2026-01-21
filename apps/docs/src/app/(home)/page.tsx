import Link from "next/link";
import { ConfigDemo } from "@/components/ConfigDemo";
import { buttonVariants } from "fumadocs-ui/components/ui/button";
import { Card } from "fumadocs-ui/components/card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Monicon",
  description:
    "Monicon is an easy-to-use icon orchestration tool that makes adding icons to your projects simple.",
};

export default function HomePage() {
  return (
    <div className="flex flex-col items-center flex-1 w-full">
      <div className="w-full max-w-7xl px-8 py-16 text-center">
        <h1 className="text-5xl text-fd-primary leading-tight font-medium tracking-tight mb-6">
          Universal Icon Library
        </h1>
        <p className="text-lg text-fd-muted-foreground max-w-3xl mx-auto mb-8">
          Monicon is an easy-to-use icon orchestration tool that makes adding
          icons to your projects simple. Access 200,000+ icons from popular sets
          like Material Design, Feather, and Font Awesome.
        </p>
        <div className="flex gap-4 justify-center">
          <Link className={buttonVariants({ variant: "primary" })} href="/docs">
            Get Started
          </Link>
          <Link
            className={buttonVariants({ variant: "outline" })}
            href="https://icones.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Explore Icons
          </Link>
        </div>
      </div>
      <div className="w-full max-w-7xl px-8 py-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card
            icon={
              <div className="size-4 items-center justify-center flex">🎨</div>
            }
            title="200,000+ Icons"
          >
            Access a vast collection of icons from popular icon sets including
            Material Design, Feather, Font Awesome, Lucide, and many more.
          </Card>

          <Card
            icon={
              <div className="size-4 items-center justify-center flex">🚀</div>
            }
            title="Framework Agnostic"
          >
            Works seamlessly with React, Vue, Svelte, Next.js, Nuxt, React
            Native, and more. One configuration for all frameworks.
          </Card>

          <Card
            icon={
              <div className="size-4 items-center justify-center flex">⚡</div>
            }
            title="Type-Safe"
          >
            Full TypeScript support with auto-generated types for all your
            icons, providing excellent developer experience.
          </Card>

          <Card
            icon={
              <div className="size-4 items-center justify-center flex">📦</div>
            }
            title="Tree-Shakeable"
          >
            Only bundle the icons you actually use. Monicon generates individual
            icons as separate files for optimal bundle size.
          </Card>

          <Card
            icon={
              <div className="size-4 items-center justify-center flex">🔧</div>
            }
            title="Customizable"
          >
            Load icons from multiple sources: online collections, local files,
            or custom JSON. Create your own plugin for any output format.
          </Card>

          <Card
            icon={
              <div className="size-4 items-center justify-center flex">⚙️</div>
            }
            title="Simple Configuration"
          >
            Configure once in monicon.config.ts and integrate with your favorite
            bundler: Vite, Webpack, Rollup, esbuild, or Rspack.
          </Card>
        </div>
      </div>
      <div className="w-full max-w-7xl px-8 py-16">
        <h2 className="text-3xl text-fd-primary font-medium text-center mb-4">
          How It Works
        </h2>
        <p className="text-center text-fd-muted-foreground mb-12 max-w-2xl mx-auto">
          Define your configuration and select the icons you need. Monicon will
          automatically generate optimized icon components tailored to your
          framework.
        </p>
        <ConfigDemo />
      </div>
      <div className="w-full max-w-7xl px-8 py-8 border-t border-fd-border">
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-sm text-fd-muted-foreground">
            Made by{" "}
            <a
              href="https://twitter.com/senkanoktay"
              target="_blank"
              rel="noopener noreferrer"
              className="text-fd-primary hover:underline font-medium"
            >
              @senkanoktay
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
