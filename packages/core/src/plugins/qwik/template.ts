const template = `import { component$, type QwikIntrinsicElements } from "@builder.io/qwik";

export const <%= it.name %> = component$((props: QwikIntrinsicElements["svg"]) => {
  return <%= it.code %>
});

export default <%= it.name %>;`;

export default template;
