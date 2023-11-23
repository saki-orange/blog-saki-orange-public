import CategoryLinks from "../components/CategoryLinks";
import Image from "next/image";
import Link from "next/link";
import { Post } from "../libs/api";

type Props = {
  post: Post;
  full?: boolean;
};

export default function PostCard({ post, full = false }: Props) {
  if (full) {
    return (
      <article className="group overflow-hidden cursor-pointer box ">
        <Link href={`/posts/${post.slug}`} className="flex flex-row">
          <div className="w-1/2">
            <Image
              className="object-cover w-full aspect-[3/2] h-full"
              src={
                post.frontMatter.image
                  ? `/images/posts/${post.slug}/${post.frontMatter.image}`
                  : "/images/noimage.webp"
              }
              width={600}
              height={400}
              alt={post.frontMatter.title}
            />
          </div>
          <div className="p-4 w-1/2 flex flex-col justify-between">
            <p className="mb-3 h-full flex items-center text-lg group-hover:underline group-hover:text-cOrange">
              {post.frontMatter.title}
            </p>
            <p className="block mb-3 text-cGray">{post.frontMatter.description}</p>
            <div>
              <div className="mb-2 -mx-0.5">
                <CategoryLinks categories={post.frontMatter.categories} noLink />
              </div>
              <div className="hr"></div>
              <p className="">最終更新：{post.frontMatter.lastupdate}</p>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="group col-span-1 overflow-hidden cursor-pointer box ">
      <Link href={`/posts/${post.slug}`} className="flex flex-col h-full">
        <div className="grow-0">
          <Image
            className="object-cover w-full aspect-[3/2]"
            src={
              post.frontMatter.image
                ? `/images/posts/${post.slug}/${post.frontMatter.image}`
                : "/images/noimage.webp"
            }
            width={600}
            height={400}
            alt={post.frontMatter.title}
          />
        </div>
        <p className="grow px-4 pt-4 mb-3 text-lr group-hover:underline group-hover:text-cOrange">
          {post.frontMatter.title}
        </p>
        <div className="grow-0 px-4 pb-4 ">
          <p className="mb-2 -mx-0.5">
            <CategoryLinks categories={post.frontMatter.categories} noLink />
          </p>
          <div className="hr"></div>
          <p className="">最終更新：{post.frontMatter.lastupdate}</p>
        </div>
      </Link>
    </article>
  );
}
