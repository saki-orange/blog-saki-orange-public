import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { NextSeo, NextSeoProps } from "next-seo";
import { BASE_URL } from "../../../blog.config";

import Main from "../../components/Common/Main";
import PostCards from "../../components/PostCards";
import Flex from "../../components/Common/Flex";
import Locator from "../../components/Locator";
import Aside from "../../components/Common/Aside";
import Profile from "../../components/Profile";
import CategoryListPC from "../../components/CategoryListPC";
import { getAllCategories, getAllPosts } from "../../libs/api";
import CategoryListSP from "../../components/CategoryListSP";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export default function Category({ posts, category, SEO, categories }: Props) {
  return (
    <>
      <NextSeo {...SEO} />
      <Locator dispList={[`${category} の記事一覧`]} />
      <Flex>
        <Main>
          <PostCards posts={posts} />
          <CategoryListSP categories={categories} />
        </Main>
        <Aside>
          <Profile />
          <CategoryListPC categories={categories} />
        </Aside>
      </Flex>
    </>
  );
}

export async function getStaticPaths() {
  const categories = getAllCategories();
  const paths = categories.map((category) => ({ params: { category } }));
  return {
    paths,
    fallback: false,
  };
}

export function getStaticProps({ params }: GetStaticPropsContext<{ category: string }>) {
  const category = params?.category;
  const sortedPosts = getAllPosts();
  const categories = getAllCategories();
  const filteredPosts = sortedPosts.filter((post) => {
    return post.frontMatter.categories.includes(category);
  });

  const SEO: NextSeoProps = {
    title: `${category}の記事一覧`,
    description: `${category}の記事一覧`,
    noindex: true,
    openGraph: {
      url: `${BASE_URL}/categories/${category}`,
      title: `${category}の記事一覧`,
      description: `${category}の記事一覧`,
    },
  };
  return {
    props: {
      posts: filteredPosts,
      category,
      categories,
      SEO,
    },
  };
}
