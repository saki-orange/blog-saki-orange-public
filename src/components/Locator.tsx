import Link from "next/link";

export default function Locator({ dispList }: { dispList?: string[] }) {
  if (!dispList) {
    return <div className="p-4 text-cGray">Home&nbsp;&nbsp;&gt;</div>;
  }

  return (
    <div className="p-4 text-cGray">
      <Link className="hover:underline" href="/">
        Home
      </Link>
      {dispList.map((item) => (
        // <span key={item.key || item}>
        <span key={item}>
          <span className="px-2">&gt;</span>
          {/* {item.el || item} */}
          {item}
        </span>
      ))}
    </div>
  );
}
