import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import * as TabsComponents from "fumadocs-ui/components/tabs";
import * as CodeBlockComponents from "fumadocs-ui/components/codeblock";

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
    ...components,
  };
}
