"use client";

import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import { buttonVariants } from "fumadocs-ui/components/ui/button";
import { File, Folder, Files } from "fumadocs-ui/components/files";
import { useState } from "react";

const examples = [
  {
    name: "React",
    code: `import type { MoniconConfig } from "@monicon/core";
import { react } from "@monicon/core/plugins";

export default {
  icons: ["mdi:home"],
  plugins: [
    react(),
  ],
} satisfies MoniconConfig;`,
    files: ["src/components/icons/mdi/home.tsx"],
  },
  {
    name: "Vue",
    code: `import type { MoniconConfig } from "@monicon/core";
import { vue } from "@monicon/core/plugins";

export default {
  icons: ["mdi:home"],
  collections: ["lucide"],
  plugins: [
    vue(),
  ],
} satisfies MoniconConfig;`,
    files: ["src/components/icons/mdi/home.vue"],
  },
  {
    name: "Svelte",
    code: `import type { MoniconConfig } from "@monicon/core";
import { svelte } from "@monicon/core/plugins";

export default {
  icons: ["mdi:home"],
  collections: ["lucide"],
  plugins: [
    svelte(),
  ],
} satisfies MoniconConfig;`,
    files: ["src/components/icons/mdi/home.svelte"],
  },
  {
    name: "SVG",
    code: `import type { MoniconConfig } from "@monicon/core";
import { svg } from "@monicon/core/plugins";

export default {
  icons: ["mdi:home"],
  collections: ["lucide"],
  plugins: [
    svg(),
  ],
} satisfies MoniconConfig;`,
    files: ["src/components/icons/mdi/home.svg"],
  },
  {
    name: "Advanced",
    code: `import type { MoniconConfig } from "@monicon/core";
import {
  loadJSONCollection,
  loadLocalCollection,
  loadRemoteCollection,
} from "@monicon/core/loaders";
import { react } from "@monicon/core/plugins";

export default {
  icons: ["mdi:home"],
  collections: ["lucide"],
  plugins: [
    react(),
  ],
  loaders: {
    local: loadLocalCollection("local"),
    json: loadJSONCollection(
      "https://gist.githubusercontent.com/oktaysenkan/39681ecdb066dc44c52fa840dacc7562/raw/6aa7b8f8bf9d806742be0e1c4759809391d00bcd/icons.json"
    ),
    remote: loadRemoteCollection({
      download: "https://api.iconify.design/lucide:cloud-download.svg",
      attachment: "https://api.iconify.design/ri:attachment-2.svg",
    }),
  },
} satisfies MoniconConfig;`,
    files: [
      "src/components/icons/mdi/home.tsx",
      "src/components/icons/lucide/house.tsx",
      "src/components/icons/lucide/message-circle.tsx",
      "src/components/icons/lucide/download.tsx",
      "src/components/icons/lucide/<other-lucide-icons>.tsx",
      "src/components/icons/local/<all-icons-in-folder>.tsx",
      "src/components/icons/json/network.tsx",
      "src/components/icons/remote/download.tsx",
      "src/components/icons/remote/attachment.tsx",
    ],
  },
  {
    name: "Custom",
    code: `import type { MoniconConfig } from "@monicon/core";
import { generic } from "@monicon/core/plugins";

export default {
  icons: ["mdi:home"],
  collections: ["lucide"],
  plugins: [
    generic({
      extension: "json",
      content: (icon) => JSON.stringify(icon, null, 2),
    }),
  ],
} satisfies MoniconConfig;`,
    files: ["src/components/icons/mdi/home.json"],
  },
];

interface FileNode {
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
}

function buildFileTree(paths: string[]): FileNode {
  const root: FileNode = { name: "", type: "folder", children: [] };

  paths.forEach((path) => {
    const parts = path.split("/");
    let current = root;

    parts.forEach((part, index) => {
      const isFile = index === parts.length - 1;
      let node = current.children?.find((child) => child.name === part);

      if (!node) {
        node = {
          name: part,
          type: isFile ? "file" : "folder",
          children: isFile ? undefined : [],
        };

        current.children?.push(node);
      }

      if (!isFile) {
        current = node;
      }
    });
  });

  return root;
}

function renderFileTree(node: FileNode): React.ReactNode {
  if (node.type === "file") {
    return <File key={node.name} name={node.name} />;
  }

  if (node.children && node.children.length > 0) {
    return (
      <Folder key={node.name} name={node.name} defaultOpen>
        {node.children.map((child) => renderFileTree(child))}
      </Folder>
    );
  }

  return null;
}

export function ConfigDemo() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentExample = examples[currentIndex];
  const fileTree = buildFileTree(currentExample.files);

  return (
    <div className="relative w-full max-w-7xl flex flex-col gap-6">
      <div className="flex items-center gap-2 flex-wrap">
        {examples.map((example, index) => (
          <button
            key={example.name}
            className={buttonVariants({
              variant: index === currentIndex ? "secondary" : "outline",
              className: "cursor-pointer",
            })}
            onClick={() => setCurrentIndex(index)}
          >
            {example.name}
          </button>
        ))}
      </div>

      <div className="relative w-full flex gap-12 lg:flex-row flex-col">
        <div className="flex flex-col w-full lg:w-8/12 p-2 border rounded-md gap-2 h-fit">
          <div className="flex flex-col border-b -mx-2">
            <h2 className="font-medium text-sm px-2 pb-2">monicon.config.ts</h2>
          </div>
          <DynamicCodeBlock lang="ts" code={currentExample.code} />
        </div>
        <div className="flex flex-col w-full lg:w-4/12">
          <div
            key={currentIndex}
            className="p-2 border rounded-md flex flex-col gap-2"
          >
            <div className="flex flex-col border-b -mx-2">
              <h2 className="font-medium text-sm px-2 pb-2">Generated Files</h2>
            </div>
            <Files>
              {fileTree.children?.map((child) => renderFileTree(child))}
            </Files>
          </div>
        </div>
      </div>
    </div>
  );
}
