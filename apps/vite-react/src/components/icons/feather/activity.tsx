import React from "react";

const ActivityIcon = (props: React.ComponentPropsWithoutRef<"svg">) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M22 12h-4l-3 9L9 3l-3 9H2"
      />
    </svg>
  );
};

export default ActivityIcon;
