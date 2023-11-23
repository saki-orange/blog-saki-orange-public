import { InferGetStaticPropsType } from "next";
import { NextSeo, NextSeoProps } from "next-seo";
import { BASE_URL, PAGE_SIZE } from "../../blog.config";

import Aside from "../components/Common/Aside";
import Profile from "../components/Profile";
import PostCards from "../components/PostCards";
import PostCard from "../components/PostCard";
import Main from "../components/Common/Main";
import Flex from "../components/Common/Flex";
import Locator from "../components/Locator";
import Pagination from "../components/Pagination";
import { range } from "../utils";
import { getAllPosts, getAllCategories } from "../libs/api";
import CategoryListPC from "../components/CategoryListPC";
import CategoryListSP from "../components/CategoryListSP";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export default function Home({ posts, pages, categories, SEO }: Props) {
  return (
    <>
      <NextSeo {...SEO} />
      <Locator />
      <Flex>
        <Main>
          <div className="hidden sm:block">
            <PostCard post={posts[0]} full />
            <h2 className="text-lr mb-5 mt-8">記事一覧</h2>
          </div>
          <PostCards posts={posts} />
          <Pagination pages={pages} />
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

export function getStaticProps() {
  const sortedPosts = getAllPosts();
  const categories = getAllCategories();

  const pages = range(1, Math.ceil(sortedPosts.length / PAGE_SIZE));
  const slicedPosts = sortedPosts.slice(0, PAGE_SIZE);

  const SEO: NextSeoProps = {
    openGraph: {
      url: `${BASE_URL}`,
    },
  };

  return {
    props: {
      posts: slicedPosts,
      pages,
      categories,
      SEO,
    },
  };
}
