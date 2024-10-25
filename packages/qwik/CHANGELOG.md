# @monicon/qwik

## 0.0.150

### Patch Changes

- [#42](https://github.com/oktaysenkan/monicon/pull/42) [`7fcefdc`](https://github.com/oktaysenkan/monicon/commit/7fcefdcab57a20b7eb8464525aecea156705f97d) Thanks [@oktaysenkan](https://github.com/oktaysenkan)! - # Qwik Support

  Monicon now supports Qwik, making it easy to use icons in Qwik applications. You can follow the installation steps to quickly integrate it into your project. Enjoy the same versatile icon sets, now optimized for the speed and efficiency of Qwik.

  ## Install

  To get started, you’ll need to install the necessary dependencies for Monicon. In your project directory, run the following command to install the dependencies.

  ```sh
  npm i @monicon/qwik @monicon/vite
  ```

  Now you should install the development dependency `@iconify/json` for the icon sets. This package provides a comprehensive collection of icons that can be easily integrated into your project.

  ```sh
  npm i -D @iconify/json

  # or specific icon sets
  npm i -D @iconify-json/mdi @iconify-json/feather
  ```

  ## Configure Vite

  Now that the dependencies are installed, you’ll need to configure Vite to use Monicon.

  ```js filename="vite.config.ts"
  import { defineConfig } from "vite";
  import monicon from "@monicon/vite";

  export default defineConfig({
    plugins: [
      monicon({
        icons: [
          "mdi:home",
          "feather:activity",
          "logos:active-campaign",
          "lucide:badge-check",
        ],
        // Load all icons from the listed collections
        collections: ["radix-icons"],
      }),
    ],
  });
  ```

  ## Usage

  You can now use Monicon in your React components. Here’s an example of how to use Monicon in a React component.

  ```tsx filename="src/routes/index.tsx"
  import { component$ } from "@builder.io/qwik";
  import { Monicon } from "@monicon/qwik";

  export default component$(() => {
    return (
      <main>
        <Monicon name="mdi:home" />
        <Monicon name="logos:active-campaign" size={32} />
        <Monicon name="feather:activity" color="red" />
        <Monicon name="lucide:badge-check" size={24} strokeWidth={4} />
      </main>
    );
  }
  ```

  ## Next Steps

  You’ve successfully set up Monicon with Qwik! You can now explore more icon sets and customize your usage further.

- Updated dependencies [[`7fcefdc`](https://github.com/oktaysenkan/monicon/commit/7fcefdcab57a20b7eb8464525aecea156705f97d)]:
  - @monicon/icon-loader@0.0.150
