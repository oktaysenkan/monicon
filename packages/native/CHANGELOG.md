# @monicon/native

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
  - @monicon/core@0.0.150
  - @monicon/icon-loader@0.0.150

## 0.0.149

### Patch Changes

- [`a096797`](https://github.com/oktaysenkan/monicon/commit/a0967972bbbb57d9ac701822fcb6e8947d7aed19) Thanks [@oktaysenkan](https://github.com/oktaysenkan)! - add support for loading collections

- Updated dependencies [[`a096797`](https://github.com/oktaysenkan/monicon/commit/a0967972bbbb57d9ac701822fcb6e8947d7aed19)]:
  - @monicon/core@0.0.149
  - @monicon/icon-loader@0.0.149

## 0.0.148

### Patch Changes

- [`a3353b6`](https://github.com/oktaysenkan/monicon/commit/a3353b6239937c6523bc621b25a6c75a63ab7cb3) Thanks [@oktaysenkan](https://github.com/oktaysenkan)! - use require instead of await import

- Updated dependencies [[`a3353b6`](https://github.com/oktaysenkan/monicon/commit/a3353b6239937c6523bc621b25a6c75a63ab7cb3)]:
  - @monicon/core@0.0.148
  - @monicon/icon-loader@0.0.148

## 0.0.147

### Patch Changes

- [`489830b`](https://github.com/oktaysenkan/monicon/commit/489830bc4f352a620f8f54ce863c2f6d8e7f075c) Thanks [@oktaysenkan](https://github.com/oktaysenkan)! - remove mjs output

- Updated dependencies [[`489830b`](https://github.com/oktaysenkan/monicon/commit/489830bc4f352a620f8f54ce863c2f6d8e7f075c)]:
  - @monicon/core@0.0.147
  - @monicon/icon-loader@0.0.147

## 0.0.146

### Patch Changes

- [#37](https://github.com/oktaysenkan/monicon/pull/37) [`4f61546`](https://github.com/oktaysenkan/monicon/commit/4f61546635416f54cd85c2c042f7b44e119d14c4) Thanks [@oktaysenkan](https://github.com/oktaysenkan)! - use await import

- Updated dependencies [[`4f61546`](https://github.com/oktaysenkan/monicon/commit/4f61546635416f54cd85c2c042f7b44e119d14c4)]:
  - @monicon/core@0.0.146
  - @monicon/icon-loader@0.0.146

## 0.0.145

### Patch Changes

- [#35](https://github.com/oktaysenkan/monicon/pull/35) [`54ee3ff`](https://github.com/oktaysenkan/monicon/commit/54ee3ffd51df589a4d2131029a55847ed15d8f9a) Thanks [@oktaysenkan](https://github.com/oktaysenkan)! - resolve navigator.product issue

- Updated dependencies [[`54ee3ff`](https://github.com/oktaysenkan/monicon/commit/54ee3ffd51df589a4d2131029a55847ed15d8f9a)]:
  - @monicon/core@0.0.145
  - @monicon/icon-loader@0.0.145

## 0.0.144

### Patch Changes

- [`0819e8d`](https://github.com/oktaysenkan/monicon/commit/0819e8d7d31485fed596e985b7dce330f82296f2) Thanks [@oktaysenkan](https://github.com/oktaysenkan)! - revert config file feature

- Updated dependencies [[`0819e8d`](https://github.com/oktaysenkan/monicon/commit/0819e8d7d31485fed596e985b7dce330f82296f2)]:
  - @monicon/icon-loader@0.0.144
  - @monicon/core@0.0.144

## 0.0.140

### Patch Changes

- remove unused deps
- Updated dependencies
  - @monicon/core@0.0.140
  - @monicon/icon-loader@0.0.140

## 0.0.139

### Patch Changes

- change import path of stringToIcon
- Updated dependencies
  - @monicon/core@0.0.139
  - @monicon/icon-loader@0.0.139

## 0.0.138

### Patch Changes

- remove side effects
- Updated dependencies
  - @monicon/core@0.0.138
  - @monicon/icon-loader@0.0.138

## 0.0.137

### Patch Changes

- implement strokeWidth support
- Updated dependencies
  - @monicon/core@0.0.137
  - @monicon/icon-loader@0.0.137

## 0.0.136

### Patch Changes

- remove importIcons functions
- Updated dependencies
  - @monicon/core@0.0.136
  - @monicon/icon-loader@0.0.136

## 0.0.135

### Patch Changes

- fix import path
- Updated dependencies
  - @monicon/core@0.0.135
  - @monicon/icon-loader@0.0.135

## 0.0.134

### Patch Changes

- remove prop drilling
- Updated dependencies
  - @monicon/core@0.0.134
  - @monicon/icon-loader@0.0.134

## 0.0.133

### Patch Changes

- fix color issue
- Updated dependencies
  - @monicon/core@0.0.133
  - @monicon/icon-loader@0.0.133

## 0.0.132

### Patch Changes

- implement prop drilling
- Updated dependencies
  - @monicon/core@0.0.132
  - @monicon/icon-loader@0.0.132

## 0.0.131

### Patch Changes

- update readme
- Updated dependencies
  - @monicon/core@0.0.131
  - @monicon/icon-loader@0.0.131

## 0.0.130

### Patch Changes

- add postinstall script
- Updated dependencies
  - @monicon/icon-loader@0.0.130
  - @monicon/core@0.0.130

## 0.0.129

### Patch Changes

- change resolve name as @monicon/runtime
- Updated dependencies
  - @monicon/icon-loader@0.0.129
  - @monicon/core@0.0.129

## 0.0.128

### Patch Changes

- change import path
- Updated dependencies
  - @monicon/icon-loader@0.0.128
  - @monicon/core@0.0.128

## 0.0.127

### Patch Changes

- change placeholder package name as icon-runtime
- Updated dependencies
  - @monicon/icon-loader@0.0.127
  - @monicon/core@0.0.127

## 0.0.126

### Patch Changes

- change placeholder package name as monicon-runtime
- Updated dependencies
  - @monicon/icon-loader@0.0.126
  - @monicon/core@0.0.126

## 0.0.125

### Patch Changes

- add placeholder variable back
- Updated dependencies
  - @monicon/icon-loader@0.0.125
  - @monicon/core@0.0.125

## 0.0.124

### Patch Changes

- add docs website
- Updated dependencies
  - @monicon/icon-loader@0.0.124
  - @monicon/core@0.0.124

## 0.0.123

### Patch Changes

- change package name
- Updated dependencies
  - @monicon/icon-loader@0.0.123
  - @monicon/core@0.0.123
