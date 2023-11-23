import PostCard from "../components/PostCard";
import { Post } from "../libs/api";

export default function PostCards({ posts }: { posts: Post[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {posts.map((post, i) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
