import { visit } from "unist-util-visit";
import type { Plugin } from "unified";
import type { Root } from "mdast";

const remarkMermaid: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, "code", (node: any, index, parent: any) => {
      if (node.lang !== "mermaid" || !parent || index === undefined) return;

      const attributes: any[] = [
        { type: "mdxJsxAttribute", name: "code", value: node.value },
      ];

      if (node.meta) {
        attributes.push({ type: "mdxJsxAttribute", name: "maxWidth", value: node.meta });
      }

      parent.children[index] = {
        type: "mdxJsxFlowElement",
        name: "MermaidBlock",
        attributes,
        children: [],
      };
    });
  };
};

export default remarkMermaid;
