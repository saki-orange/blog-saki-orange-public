import { visit } from "unist-util-visit";
import { Child, h } from "hastscript";
import { type Transformer } from "unified";
import type { Element } from "hast";

export default function rephypeMyDetail(): Transformer {
  return (tree) => {
    visit(tree, "element", (node: Element) => {
      if (["details"].includes(node.tagName)) {
        node.properties!.className = ["mydetail"];
        const detailsChildren = node.children as Element[];
        const summary = detailsChildren.filter(
          (el: Element) => el.tagName === "summary"
        )[0];
        const others = detailsChildren.filter((el) => el.tagName !== "summary");
        summary.properties!.className = ["mydetail__summary"];
        node.children = [
          summary,
          h("div", { class: "mydetail__others" }, others as Child) as Element,
        ];
      }
    });
  };
}
