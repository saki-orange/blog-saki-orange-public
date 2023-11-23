import sizeOf from "image-size";
import { visit } from "unist-util-visit";
import { type Transformer } from "unified";
import { type Element } from "hast";

/**
 * 画像のサイズを取得し、プロパティに追加
 */
export default function rehypeImageSize(): Transformer {
  return (tree) => {
    visit(tree, "element", (node: Element) => {
      if (["img"].includes(node.tagName)) {
        const { width, height } = sizeOf("public" + node.properties!.src);
        node.properties!.width = width;
        node.properties!.height = height;
      }
    });
  };
}
