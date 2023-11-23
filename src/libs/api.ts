import fs from "fs";
import matter from "gray-matter";

const POSTS_DIR = "contents/posts";

export type Post = {
  frontMatter: {
    [key: string]: any;
  };
  content: string;
  slug: string;
};

function getPostBySlug(slug: string): Post {
  const file = fs.readFileSync(`${POSTS_DIR}/${slug}.md`, "utf-8");
  let { data: frontMatter, content } = matter(file);
  if (!fs.existsSync(`public/images/posts/${slug}/${frontMatter.image}`)) {
    frontMatter.image = null;
  }
  const post = { frontMatter, content, slug };
  return post;
}

function getAllPosts(): Post[] {
  const files = fs.readdirSync(POSTS_DIR);
  const posts = files
    .map((fileName) => getPostBySlug(fileName.replace(/\.md$/, "")))
    .filter((post) => post.frontMatter.draft === false)
    .sort((postA, postB) =>
      new Date(postA.frontMatter.date) < new Date(postB.frontMatter.date) ? 1 : -1
    );
  return posts;
}

export type Category = string;

function getAllCategories(): Category[] {
  const categoriesSet = new Set<string>();
  const posts = getAllPosts();
  posts.map((post) =>
    post.frontMatter.categories.map((category: string) => categoriesSet.add(category))
  );
  return Array.from(categoriesSet);
}

export { getPostBySlug, getAllPosts, getAllCategories };
