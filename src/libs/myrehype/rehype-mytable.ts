import { visit } from "unist-util-visit";
import { h } from "hastscript";
import { type Transformer } from "unified";
import type { Element } from "hast";

export default function rehypeMyTable(): Transformer {
  return (tree) => {
    visit(tree, "element", (node: Element, index, parent: Element) => {
      if (["table"].includes(node.tagName)) {
        node.properties!.className = ["mytable"];
        const wrapper = h("div", { class: "mytable__wrapper" }, [node]);
        parent.children[index] = wrapper;
      }
    });
  };
}
