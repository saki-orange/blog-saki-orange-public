import Link from "next/link";
import type { Category } from "../libs/api";
export type Props = {
  categories: Category[];
  noLink?: boolean;
};

export default function CategoryLinks({ categories, noLink = false }: Props) {
  return (
    <>
      {categories.map((category) => (
        <span
          key={category}
          className={`border bg-white inline-block p-1 m-0.5 rounded-md ${
            !noLink && "hover:opacity-70"
          }`}
        >
          {noLink ? category : <Link href={`/categories/${category}`}>{category}</Link>}
        </span>
      ))}
    </>
  );
}
