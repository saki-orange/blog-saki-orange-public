import Image from "next/image";
import { useEffect } from "react";
import { NextSeo, NextSeoProps } from "next-seo";
import { BASE_URL } from "../../../blog.config";

import Aside from "../../components/Common/Aside";
import Main from "../../components/Common/Main";
import Flex from "../../components/Common/Flex";
import Profile from "../../components/Profile";
import TableContents from "../../components/TableContents";
import Locator from "../../components/Locator";
import CategoryLinks from "../../components/CategoryLinks";

import "highlight.js/styles/stackoverflow-light.css";

import { getAllPosts, getPostBySlug } from "../../libs/api";
import { getTocFromHtml, markdown2html } from "../../libs/markdown-processer";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export default function Post({ frontMatter, content, SEO, toc, hasNoImg, slug }: Props) {
  useEffect(() => {
    const codeBlockEls = document.querySelectorAll(".codeblock");
    codeBlockEls.forEach((el) => {
      const copyBtn = el.querySelector<HTMLElement>(".codeblock__btn");
      const txt = el.querySelector<HTMLElement>(".codeblock__txt")?.textContent || "";
      copyBtn?.addEventListener("click", () => {
        navigator.clipboard.writeText(txt);
        copyBtn.innerHTML = "Copied!";
        setTimeout(() => (copyBtn.innerHTML = "Copy"), 2000);
      });
    });
  }, []);
  return (
    <>
      <NextSeo {...SEO} />
      <Locator dispList={[frontMatter.title]} />
      <Flex>
        <Main>
          <div className="overflow-hidden box">
            <div className=" overflow-hidden">
              <Image
                className={`w-full object-cover aspect-[3/2] ${hasNoImg && "hidden"}`}
                src={`/images/posts/${slug}/${frontMatter.image}`}
                width={750}
                height={500}
                alt="article image"
                priority
              />
            </div>
            <div className="p-4 sm:p-5">
              <div className="overflow-hidden">
                <h1 className="mb-4 font-bold text-lg ">{frontMatter.title}</h1>
                <div className="-mx-0.5 mb-2 text-md">
                  <CategoryLinks categories={frontMatter.categories} />
                </div>
                <p className="mb-5">最終更新：{frontMatter.lastupdate}</p>
                <div className="hr"></div>
                <div
                  className="px-1 py-4 min-w-full prose text-cBlack"
                  dangerouslySetInnerHTML={{ __html: content }}
                ></div>
              </div>
            </div>
          </div>
        </Main>
        <Aside>
          <Profile />
          <TableContents toc={toc} />
        </Aside>
      </Flex>
    </>
  );
}

export async function getStaticPaths() {
  const posts = getAllPosts();
  const paths = posts.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ slug: string }>) {
  const slug = params?.slug || "";
  const { frontMatter, content } = getPostBySlug(slug);
  const hasNoImg = frontMatter.image ? false : true;

  const htmlStr = await markdown2html(content);
  const toc = await getTocFromHtml(htmlStr);

  const SEO: NextSeoProps = {
    title: frontMatter.title,
    description: frontMatter.description,
    openGraph: {
      url: `${BASE_URL}/posts/${slug}`,
      title: frontMatter.title,
      description: frontMatter.description,
      images: [
        {
          url: `${BASE_URL}/images/posts/${params?.slug}/${frontMatter.image}`,
          width: 600,
          height: 400,
          alt: frontMatter.title,
        },
      ],
    },
  };

  return {
    props: { frontMatter, content: htmlStr, SEO, toc, hasNoImg, slug },
  };
}
