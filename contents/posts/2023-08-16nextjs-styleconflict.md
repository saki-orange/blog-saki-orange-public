---
title: "tailwind typographyとreact-syntax-highlighterのスタイルが競合する問題"
date: "2023-08-16"
description: "tailwind typographyとreact-syntax-highlighterのスタイルが競合する問題の一解決方法を紹介しています。"
image: "thumbnail.webp"
categories: ["Next.js"]
lastupdate: "2023-08-16"
draft: false
---

このブログの開発中、tailwind typographyとreact-syntax-highlighterを組み合わせて実装していると、
![競合の解決前の画像](/images/posts/2023-08-16nextjs-styleconflict/typography_before.webp)
のように、tailwind typographyとreact-syntax-highlighterのスタイルが競合するためおかしな表示になってしまいました。

これを回避するため、tailwind typographyのコードブロックに関するスタイルを無効化する方法を探していた所、以下のような方法が見つかりました。

tailwind.config.jsで、

```javascript
module.exports = {
  // ...
  theme: {
    // ...
    extend: {
      // ...
      typography: {
        DEFAULT: {
          css: {
            pre: null,
            code: null,
            "code::before": null,
            "code::after": null,
            "pre code": null,
            "pre code::before": null,
            "pre code::after": null,
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
```

のようにコードブロックに関するスタイルを`null`に上書きします。

参考：[[Blog post] Introducing Tailwind CSS Typography #2021](https://github.com/tailwindlabs/tailwindcss/discussions/2021)

こうすることで、以下のように表示がスッキリしました。
![競合の解決後の画像](/images/posts/2023-08-16nextjs-styleconflict/typography_after.webp)
しかし、中のコードと背景の間に余白がほしいので、以下の通りreact-syntax-highlighterのオプションでpaddingとborder-radiusを付与しました。

```javascript
<SyntaxHighlighter
  customStyle={{
    padding: "20px",
    borderRadius: "8px",
  }}
  style={stackoverflowLight}
  language={lang}
>
  {children}
</SyntaxHighlighter>
```

参考：[Is there a simple way to apply a custom theme to react-syntax-highlighter?](https://stackoverflow.com/questions/66079503/is-there-a-simple-way-to-apply-a-custom-theme-to-react-syntax-highlighter)

最終的には以下のようになります。

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

他に、オプションで行番号をつけたりすることもできます。オプション一覧は以下のリンク先の通りです。

参考：[react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter#use)
