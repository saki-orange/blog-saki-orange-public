---
title: "Next.jsでブログを作りました"
date: "2023-08-16"
description: "Next.jsでこのブログを作る際につまずいたポイントをまとめています。"
image: "thumbnail.webp"
categories: ["Next.js"]
lastupdate: "2023-10-05"
draft: false
---

※2023-10-05追記</br>
ブログのソースコードを以下の公開用のリポジトリを作り公開しました。</br>
[blog-saki-orange-public (GitHub)](https://github.com/saki-orange/blog-saki-orange-public)

---

フロントエンドの練習がてらNext.jsでブログを作成しました。その際につまずいたポイントをまとめようと思います。

<!-- 基本的には、以下のアールエフェクトさんの記事を参考に作成しました。 -->

基本的には、以下の記事を参考に作成しました。詳細に、ステップバイステップでNext.jsでのブログの作り方を解説されているのでとてもおすすめです。

参考：[Next.jsを利用した初めての本格的Markdownブログサイトの構築](https://reffect.co.jp/react/nextjs-markdown-blog/)

## 主な使用技術

- Next.js
- Tailwind CSS
- tailwindcss/typography
- remark/rehype
  | プラグイン名 | 目的 |
  | ---- | ---- |
  | remark-gfm | markdown表現の拡張 |
  | remark-math | KaTeXを利用可能にする |
  | remark-slug | 目次からh2,h3タグにリンクを飛ばすためのidを付与 |
  | rehype-raw | markdown内でhtmlタグを使えるようにする |
  | remark-katex | KaTeXを利用可能にする |
  | remark-react | imgタグをnext/imageに変換したり、コードのコピーボタン実装のため |

なお、markdown内でhtmlタグを使えるようにするには、

```javascript
.use(remarkRehype, { allowDangerousHtml: true })
```

のような形でremark-rehypeのオプションで`allowDangerousHtml: true`を追加する必要があります。

参考：[Example: supporting HTML in markdown properly](https://github.com/remarkjs/remark-rehype#example-supporting-html-in-markdown-properly)

ブログのように他者からの投稿がない場合はあまり気にしなくてもいいかもしれませんが、zennやQiitaのように誰でもmarkdownを使って記事を投稿できるwebサービスではXSSの危険性があるので上のようなhtmlタグが自由に使える設定を避けるか、rehype-sanitaize等を使って適切にサニタイズしましょう。

rehype-react以外はgetStaticProps内で実行し、rehype-reactに関してはコードのコピーボタン実装にstateを使うためクライアントサイドで実行するように実装しました。

## 躓いたポイント

### 目次の作成

目次の作成について、最初rehype-tocの使用も考えましたが、markdownの内容が表示される領域の外(aside)に目次を表示したかったため断念しました。

asideでも目次が生成できるようにするため、最初はremark/rehypeでhtmlに変換した文字列をcheerioで読み込み、h2,h3タグを抽出してgetStaticPropsから渡すように実装していましたが、やはりrehypeで完結できるようにしたいと思い、以下のようにrehypeプラグインを自作しました。

```javascript
export default async function markdown2html(content) {
  const toc = [];
  const result = await unified()
    // ...
    .use(() => {
      return (tree) => {
        visit(tree, "element", (node) => {
          if (["h2", "h3"].includes(node.tagName)) {
            toc.push({
              id: node.properties.id,
              tag: node.tagName,
              text: node.children[0] ? node.children[0].value : "",
            });
          }
        });
      };
    })
    // ...
    .process(content);
  return { html: result.toString(), toc };
}
```

プラグイン内から外部の配列を編集しているので良い実装とは言えませんが、これ以外に実装の仕方が思いつきませんでした。

処理内容としては、hastからh2,h3タグを検索しidとh2,h3などのタグ名、中身のテキストをオブジェクトとして外部の配列`toc`にpushするというものです。`toc`はgetStaticPropsで戻り値として渡され、目次の表示に使われます。

### コードハイライトでインラインのコードかそうでないかを判断できない

`hoge`のようなインラインのコードとそうでないコードブロックを識別するには、codeタグの親要素にpreタグがあるかどうかを見れば識別できます。

しかし、このブログではremark-reactでcodeタグをコードのコピー機能を備えた別のコンポーネントに置き換える処理を行っており、置き換える段階で親要素がpreタグかどうか調べるのは難易度が高いため、codeタグの`className`がundefinedかどうかで識別することにしました。

ただ、これには例外があって、

````
```
hoge fuga
```
````

のように言語を指定せずにコードブロックが書かれた場合、`className`がなしになるのでインラインのコードとして認識されてしまいます。そこで、markdownからhtmlに変換する段階で`className`がないかつインラインでないコードブロックには`className`に`language-plaintext`を付与するrehypeプラグインを作成しました。

プラグインの実装例は以下のとおりです。

```javascript
export default function rehypeCodeBlockIdentifier() {
  return (tree) => {
    visit(tree, "element", (node) => {
      if (["pre"].includes(node.tagName) && !node.children[0].properties.className)
        node.children[0].properties.className = ["language-plaintext"];
    });
  };
}
```

markdownからhtmlに変換する段階であれば、子要素にcodeタグを持つpreタグを探すことでインラインであるかどうか判定でき実装がしやすく、先程述べた例外も回避することができます。

### next/imageでサイズ不定の画像をどう扱うか

今回のブログ制作では、markdown内で画像を扱うに当たって、

1. 常に横幅いっぱいor画像のサイズに合わせて画像を表示したい
1. いちいちmd内でwidth,heightは指定したくない
1. 目次の内部リンクで飛んだときに表示がずれてほしくない

という気持ちがありました。1と2は以下のようにnext/imageを設定すれば解決できます。

```javascript
<Image
  className="mx-auto w-full object-contain "
  src={src}
  alt={alt}
  width={0}
  height={0}
  sizes="100vw"
/>
```

参考：[How can I use next.js 13 image without providing width and height?](https://stackoverflow.com/questions/74251314/how-can-i-use-next-js-13-image-without-providing-width-and-height)

しかし、これだとheightがないため表示がずれ、3が満たせません。

<!-- 基本的に、next/imageではfillプロパティを指定しない限り、
width,heightを指定しないと
`Image with src "hoge.jpg" is missing required "width" property`
といったようなエラーが出るのですが、
いちいち使う画像のサイズを調べてmarkdownに書き込むのも億劫なので、 -->

そこで、以下の記事を参考にimage-sizeというライブラリを用いて画像からwidth,heightを取得し、imgタグに付与するrehypeプラグインを実装することで回避しました。

参考：[Next.js で Markdown 中の画像を next/image に対応させる](https://zenn.dev/elpnt/articles/c17727e9d254ef00ea60)

### Footnote(脚注)のリンクが効かない

Footnoteとは[^1]のような注釈を入れるための記法で、僕の実装の仕方だと[^1]から脚注に飛ぶことはできるのですが、脚注から[^1]に飛ぶことができませんでした。理由を調べてみると、aタグを置き換えたあとのMyLinkコンポーネント

```javascript
export default function MyLink(props) {
  let { children, href } = props;
  if (href === "") href = "/";
  return href.startsWith("/") || href.startsWith("#") ? (
    <Link {...props} href={href} className="hover:text-cOrange">
      {children}
    </Link>
  ) : (
    <a href={href} target="_blank" rel="noopener" className="hover:text-cOrange">
      {children}
    </a>
  );
}
```

において、Linkタグにpropsの中身を展開していなかったのが原因でした。[^1]にもidが振られており、`{...props}`がないとidが省かれてしまうようです。

[^1]: Footenote

### tailwind typographyとreact-syntax-highlighterのスタイルが競合する

以下の記事にまとめました。

[tailwind typographyとreact-syntax-highlighterのスタイルが競合する問題](/posts/2023-08-16nextjs-styleconflict)

<!-- このブログでは、imgタグをnext/imageに、内部リンクをaタグからnext/linkに置き換えるために、remark-reactを用いて以下のように処理しているのですが、
```javascript
const toReactNode = (content) => {
  return unified()
    .use(rehypeParse, {
      fragment: true,
    })
    .use(rehypeReact, {
      createElement,
      Fragment,
      components: {
        a: MyLink,
        img: MyImage,
        code: CodeBlock,
        details: MyDetails,
      },
    })
    .processSync(content).result;
};
```
aタグの置き換え先のMyLinkコンポーネントの実装
-->

<!-- ### react-syntax-highlighterにおけるパフォーマンス改善 -->
<!-- ### コードのコピーボタンの作成 -->

<!-- ## 余談
### next/fontでweight指定しないほうがバンドルサイズが小さかった

### .DS_Storeが原因でエラー -->
