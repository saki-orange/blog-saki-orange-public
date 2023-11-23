import type { AppProps } from "next/app";
import { Noto_Sans_JP } from "next/font/google";
import Layout from "../components/Common/Layout";
import { DefaultSeo } from "next-seo";
import { SEO } from "../../blog.config";
import "../styles/globals.css";
import "katex/dist/katex.min.css";
// import "highlight.js/styles/stackoverflow-light.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-notojp",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={`${notoSansJP.className}`}>
      <Layout>
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}

export default MyApp;
