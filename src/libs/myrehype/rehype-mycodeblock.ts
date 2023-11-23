import { visit } from "unist-util-visit";
import { h } from "hastscript";
import type { Transformer } from "unified";
import { type Element } from "hast";

const copyBtnHst = h("div", { class: "codeblock__btn__wrapper" }, [
  h(
    "button",
    {
      class: "codeblock__btn",
    },
    "Copy"
  ),
]);

/**
 * インラインのコードブロックと通常のコードブロックを分類するための識別子を付与し、コピーボタンを追加する
 */
export default function rehypeMyCodeBlock(): Transformer {
  /**
   *   inlineでない(<pre>を親に持たない<code>)
   * かつクラス名が付与されていないコードブロックに
   * クラス"hljs"を追加
   * コピーボタンの追加
   */
  return (tree) => {
    visit(tree, "element", (node: Element, index: number, parent: Element) => {
      if (["pre"].includes(parent.tagName) && ["code"].includes(node.tagName)) {
        // block
        const preEl = parent;
        if (preEl.properties) {
          preEl.properties.className ??= [];
          Array.isArray(preEl.properties.className) &&
            preEl.properties.className.push("codeblock group");
        }
        const codeEl = node;
        if (codeEl.properties) {
          codeEl.properties.className ??= ["hljs"];
          Array.isArray(codeEl.properties.className) &&
            codeEl.properties.className.push("codeblock__txt");
        }
        preEl.children.push(copyBtnHst as Element);
      }
      if (["code"].includes(node.tagName)) {
        if (!node.properties!.className) {
          // inline
          node.properties!.className = ["codeblock__inline"];
        }
      }
    });
  };
}
