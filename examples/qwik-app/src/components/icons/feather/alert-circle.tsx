import { component$, type QwikIntrinsicElements } from "@builder.io/qwik";

const FeatherAlertCircleIcon = component$(
  (props: QwikIntrinsicElements["svg"]) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
        <g
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4m0 4h.01" />
        </g>
      </svg>
    );
  },
);

export default FeatherAlertCircleIcon;
