import { NextSeoProps } from "next-seo";

const SEO: NextSeoProps = {
  title: "saki blog",
  description: "自分が使用した技術で躓いたところをまとめるブログです。",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    site_name: "saki_blog",
  },
};
const BASE_URL = "https://blog.saki-orange.com";
const PAGE_SIZE = 12;

export { SEO, BASE_URL, PAGE_SIZE };
