# React Native Iconify

react-native-iconify is a library that simplifies the use of icons in React Native projects. It provides access 150,000+ icons.

You can find all the supported icons on these websites:

[Icones](https://icones.js.org/)
[Iconify](https://icon-sets.iconify.design/)

## Installation

To use the react-native-iconify library, you first need to install it in your project. You can do this using the following command:

```sh
npm install react-native-iconify
```

Install [react-native-svg](https://github.com/software-mansion/react-native-svg#installation)

```sh
# for bare react native apps
npm install react-native-svg
npx pod-install
```

or

```sh
# for Expo apps
npx expo install react-native-svg
```

Add comment line to entryfile of your project (App.js or App.tsx or main.tsx or \_layout.tsx)

```tsx
// @@iconify-code-gen

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

Add plugin to (babel.config.js)

```js
module.exports = {
  presets: [
    ...
  ],
  plugins: [
    ...
    'react-native-iconify/plugin',
    {
      icons: [
        'mdi:heart',
        'mdi:home',
        'mdi:account',
        // other icons
      ],
    },
  ],
};
```

Add plugin to vite.config for Vite

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          [
            'react-native-iconify/babel',
            {
              icons: [
                'mdi:heart',
                'mdi:home',
                'mdi:account',
                // other icons
              ],
            },
          ],
        ],
      },
    }),
  ],
});
```

Add plugin to next.config.mjs for Next

Warning: You can not use "next/font" with babel

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(js|jsx|ts|tsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['next/babel'],
          plugins: [
            [
              'react-native-iconify/babel',
              {
                icons: [
                  'mdi:heart',
                  'mdi:home',
                  'mdi:account',
                  // other icons
                ],
              },
            ],
          ],
        },
      },
    });

    return config;
  },
};

export default nextConfig;
```

## Usage

Using the react-native-iconify library is straightforward. First, you need to call the Iconify component and provide the icon name using the icon prop:

```js
import React from 'react';
import { Iconify } from 'react-native-iconify';
// or
import { Iconify } from 'react-native-iconify/native';

// for web (not react-native-web)
import { Iconify } from 'react-native-iconify/web';

const ExampleScreen = () => {
  return <Iconify icon="mdi:heart" size={24} color="#900" />;
};

export default ExampleScreen;
```

In the example above, we show how to use the mdi-heart Iconify icon. You can provide values for the size and color props to customize the appearance of the icon.

## Bundle size

Tested on empty expo managed app

| Icons | Size (MB) | Difference (MB) |
| ----- | --------- | --------------- |
| 1     | 3.07      | -               |
| 100   | 3.14      | +0.07           |
| 1000  | 3.7       | +0.63           |

## Troubleshooting

### Iconify: You need to install a Babel plugin before using this library. You can continue by adding the following to your babel.config.js

If you're using a library that requires the "react-native-iconify/plugin" Babel plugin but you forgot to install it, you may encounter errors. Here's how to troubleshoot and fix the issue:

Add the following code to your Babel configuration file (usually babel.config.js):

```js
module.exports = {
  presets: [
    ...
  ],
  plugins: [
    ...
    'react-native-iconify/plugin',
    {
      icons: [
        'mdi:heart',
        'mdi:home',
        'mdi:account',
        // other icons
      ],
    },
  ],
};
```

After installing and configuring the plugin, you may need to restart your bundler to ensure that the changes take effect.

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
