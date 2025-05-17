import React from "react";

export const BaselineChatIcon = (
  props: React.ComponentPropsWithoutRef<"svg">,
) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      {...computedProps}
    >
      <path
        fill="currentColor"
        d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2M6 9h12v2H6zm8 5H6v-2h8zm4-6H6V6h12z"
      />
    </svg>
  );
};

export default BaselineChatIcon;
