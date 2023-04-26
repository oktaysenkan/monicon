# React Native Iconify

react-native-iconify is a library that simplifies the use of icons in React Native projects. It provides access 150,000+ icons.

## Installation

To use the react-native-iconify library, you first need to install it in your project. You can do this using the following command:

```sh
npm install react-native-iconify
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

Using the react-native-iconify library is straightforward. First, you need to call the Iconify component and provide the icon name using the name prop:

```js
import React from 'react';
import { Iconify } from 'react-native-iconify';

const ExampleScreen = () => {
  return <Iconify name="mdi:heart" size={24} color="#900" />;
};

export default ExampleScreen;
```

In the example above, we show how to use the mdi-heart Iconify icon. You can provide values for the size and color props to customize the appearance of the icon.

## Supported Iconify Icons

The react-native-iconify library supports all of Iconify's icons. You can find all the supported icons on [Iconify's official website](https://icon-sets.iconify.design/)

## Troubleshooting

### Icon prop 'icon' must be a string literal

The correct prop to use for passing the icon name.

Here is an example of the **incorrect** usage:

```js
const icon = 'mdi:heart';
<Iconify icon={icon} size={24} color="red" />;
```

To fix this issue, use like this:

```js
<Iconify icon="mdi:heart" size={24} color="red" />
```

Adding more than 150,000 icons to the application would increase the size and loading time of the application. Therefore, the React Native Iconify Babel plugin loads only the necessary icons, allowing the application to contain only the icons that are needed.

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
