import Monicon from "./components/monicon/monicon";

export default () => {
  return (
    <>
      <head>
        <meta charset="utf-8" />
        <title>Qwik Blank App</title>
      </head>
      <body>
        <Monicon name="lucide:heart" size={32} color="red" />
      </body>
    </>
  );
};
