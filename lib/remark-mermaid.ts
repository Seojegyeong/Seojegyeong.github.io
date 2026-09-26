import { visit } from "unist-util-visit";
import type { Plugin } from "unified";
import type { Root } from "mdast";

const remarkMermaid: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, "code", (node: any, index, parent: any) => {
      if (node.lang !== "mermaid" || !parent || index === undefined) return;

      parent.children[index] = {
        type: "mdxJsxFlowElement",
        name: "MermaidBlock",
        attributes: [
          {
            type: "mdxJsxAttribute",
            name: "code",
            value: node.value,
          },
        ],
        children: [],
      };
    });
  };
};

export default remarkMermaid;
