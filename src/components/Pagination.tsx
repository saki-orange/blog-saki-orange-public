import Link from "next/link";

type Props = {
  pages: number[];
  current_page?: number;
};

export default function Pagination({ pages, current_page = 1 }: Props) {
  return (
    <div className="flex pt-10 item-center justify-center">
      <div className="flex rounded-md overflow-hidden border bg-white">
        {pages.map((page) =>
          current_page == page ? (
            <span key={page} className="px-4 py-2 bg-cGray text-white select-none">
              {page}
            </span>
          ) : (
            <Link
              href={`/page/${page}`}
              key={page}
              className="px-4 py-2 hover:opacity-70"
            >
              {page}
            </Link>
          )
        )}
      </div>
    </div>
  );
}
