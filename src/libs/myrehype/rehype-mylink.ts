import { visit } from "unist-util-visit";
import { type Transformer } from "unified";
import type { Element } from "hast";

export default function rehypeMyLink(): Transformer {
  return (tree) => {
    visit(tree, "element", (node: Element) => {
      if (["a"].includes(node.tagName)) {
        const href = String(node.properties!.href);
        node.properties!.className ??= [];
        Array.isArray(node.properties!.className) &&
          node.properties!.className.push("mylink");
        if (!(href.startsWith("/") || href.startsWith("#"))) {
          node.properties!.target = "_blank";
          node.properties!.rel = "noopener";
        }
      }
    });
  };
}
