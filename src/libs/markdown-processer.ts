import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeRaw from "rehype-raw";
import rehypeKatex from "rehype-katex";
import rehypeStringify from "rehype-stringify";
import rehypeImageSize from "./myrehype/rehype-image-size";
import rehypeMydetail from "./myrehype/rehype-mydetail";
import rehypeMylink from "./myrehype/rehype-mylink";
import rehypeMyCodeBlock from "./myrehype/rehype-mycodeblock";
import rehypeMyTable from "./myrehype/rehype-mytable";
import { visit } from "unist-util-visit";
import rehypeHighlight from "rehype-highlight";
import rehypeParse from "rehype-parse/lib";
import { type Element, type Node, type Text } from "hast";

async function markdown2html(content: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype, {
      allowDangerousHtml: true,
      footnoteLabel: " ",
      footnoteLabelTagName: "div",
    })
    .use(rehypeSlug)
    .use(rehypeRaw)
    .use(rehypeKatex)
    .use(rehypeHighlight)
    .use(rehypeMyCodeBlock)
    .use(rehypeImageSize)
    .use(rehypeMydetail)
    .use(rehypeMyTable)
    .use(rehypeMylink)
    .use(rehypeStringify)
    .process(content);
  return result.toString();
}

export type Toc = {
  id: string;
  tag: string;
  text: string;
};

async function getTocFromHtml(content: string): Promise<Toc[]> {
  const toc: Toc[] = [];
  await unified()
    .use(rehypeParse)
    .use(() => {
      return (tree: Node) => {
        visit(tree, "element", (node: Element) => {
          if (["h2", "h3"].includes(node.tagName)) {
            const headerEl = node.children[0] as Text;
            toc.push({
              id: String(node?.properties?.id) || "",
              tag: node.tagName,
              text: headerEl.value || "",
            });
          }
        });
      };
    })
    .use(rehypeStringify)
    .process(content);
  return toc;
}

export { markdown2html, getTocFromHtml };
