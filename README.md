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
# for expo apps
expo install react-native-svg
```

add plugin to (babel.config.js)

```js
module.exports = {
  presets: [
    ...
  ],
  plugins: [
    ...
    'react-native-iconify/plugin',
  ],
};
```

## Usage

Using the react-native-iconify library is straightforward. First, you need to call the Iconify component and provide the icon name using the icon prop:

```js
import React from 'react';
import { Iconify } from 'react-native-iconify';

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

### Iconify: 'icon' prop must be a string literal

Adding more than 150,000 icons to the application would increase the size and loading time of the application. Therefore, the React Native Iconify Babel plugin loads only the necessary icons, allowing the application to contain only the icons that are needed so you cannot use variable.

Here is an example of the **incorrect** usage:

```js
const icon = 'mdi:heart';
<Iconify icon={icon} size={24} color="red" />;
```

To fix this issue, use like this:

```js
<Iconify icon="mdi:heart" size={24} color="red" />
```

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
  ],
};
```

After installing and configuring the plugin, you may need to restart your bundler to ensure that the changes take effect.

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
