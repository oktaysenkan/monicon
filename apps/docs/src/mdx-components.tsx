import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import * as TabsComponents from "fumadocs-ui/components/tabs";
import * as CodeBlockComponents from "fumadocs-ui/components/codeblock";
import {
  createGenerator,
  createFileSystemGeneratorCache,
} from "fumadocs-typescript";
import { AutoTypeTable } from "fumadocs-typescript/ui";

const generator = createGenerator({
  // set a cache, necessary for serverless platform like Vercel
  cache: createFileSystemGeneratorCache(".next/fumadocs-typescript"),
});

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...TabsComponents,
    ...CodeBlockComponents,
    pre: ({ ref: _ref, ...props }) => (
      <CodeBlockComponents.CodeBlock {...props}>
        <CodeBlockComponents.Pre>{props.children}</CodeBlockComponents.Pre>
      </CodeBlockComponents.CodeBlock>
    ),
    AutoTypeTable: (props) => (
      <AutoTypeTable {...props} generator={generator} />
    ),
    ...components,
  };
}
