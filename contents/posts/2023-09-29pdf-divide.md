---
title: "Mac・Linuxでの見開きPDFの分割方法"
date: "2023-09-29"
description: "Mac・Linuxでの見開きPDFの分割方法"
image: "thumbneil.webp"
categories: ["Mac"]
lastupdate: "2023-09-29"
draft: false
---

PDF形式で購入した書籍やスキャンした書類など、見開き1ページになっているPDFをMacやLinuxで2ページに分割したい場合は、以下のような操作を行うとできます。

まず、以下のようにhomebrewで`mupdf-tools`をインストールします。Linuxの方はhomebrewではなくaptでインストールできるはずです。

```bash
brew install mupdf-tools
```

分割する際には以下のコマンドを実行します。

```bash
mutool poster -x 2 (分割したいPDFファイル名).pdf (出力ファイル名).pdf
```

参考：[Splitting a PDF page in two](https://askubuntu.com/questions/56853/splitting-a-pdf-page-in-two)
