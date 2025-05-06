const template = `import React from "react";

export const <%= it.name %> = (props: React.ComponentPropsWithoutRef<"svg">) => {
  return <%= it.code %>
};

export default <%= it.name %>;`;

export default template;
