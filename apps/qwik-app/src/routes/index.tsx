import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Monicon } from "@monicon/qwik";

export default component$(() => {
  return (
    <>
      <Monicon name="lucide:heart" size={32} color="red" />
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
