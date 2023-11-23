import { BASE_URL, PAGE_SIZE } from "../../../blog.config";
import Aside from "../../components/Common/Aside";
import Profile from "../../components/Profile";
import PostCards from "../../components/PostCards";
import Main from "../../components/Common/Main";
import Flex from "../../components/Common/Flex";
import Locator from "../../components/Locator";
import Pagination from "../../components/Pagination";
import { range } from "../../utils";
import { getAllCategories, getAllPosts } from "../../libs/api";
import CategoryListPC from "../../components/CategoryListPC";
import { NextSeo, NextSeoProps } from "next-seo";
import CategoryListSP from "../../components/CategoryListSP";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export default function Page({ posts, pages, current_page, categories, SEO }: Props) {
  return (
    <>
      <NextSeo {...SEO} />
      <Locator dispList={[`記事一覧 ページ${current_page}`]} />
      <Flex>
        <Main>
          <PostCards posts={posts} />
          <Pagination pages={pages} current_page={current_page} />
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
  const posts = getAllPosts();
  const count = posts.length;

  const paths = range(1, Math.ceil(count / PAGE_SIZE)).map((i) => ({
    params: { page: i.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ page: string }>) {
  const current_page = Number(params?.page);

  const sortedPosts = getAllPosts();

  const pages = range(1, Math.ceil(sortedPosts.length / PAGE_SIZE));
  const slicedPosts = sortedPosts.slice(
    PAGE_SIZE * (current_page - 1),
    PAGE_SIZE * current_page
  );
  const categories = getAllCategories();

  const SEO: NextSeoProps = {
    title: `記事一覧 ページ${current_page}`,
    noindex: true,
    description: `記事一覧 ページ${current_page}`,
    openGraph: {
      url: `${BASE_URL}/page/${current_page}`,
      title: `記事一覧 ページ${current_page}`,
      description: `記事一覧 ページ${current_page}`,
    },
  };

  return {
    props: {
      posts: slicedPosts,
      pages,
      current_page,
      categories,
      SEO,
    },
  };
}
