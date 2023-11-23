import { Toc } from "../libs/markdown-processer";

export default function TableContents({ toc }: { toc: Toc[] }) {
  return (
    <div className="sticky  top-5  ">
      <div className="overflow-hidden box ">
        <div className="py-5 bg-sGray text-center">目次</div>
        <ul className="p-5 space-y-3 overflow-y-auto max-h-[55vh]">
          {toc.map((tocItem) => {
            switch (tocItem.tag) {
              case "h2":
                return (
                  <li key={tocItem.id} className="cursor-pointer hover-orange">
                    <a href={`#${tocItem.id}`} className="block w-full">
                      {tocItem.text}
                    </a>
                  </li>
                );
              case "h3":
                return (
                  <li key={tocItem.id} className="ml-3 cursor-pointer hover-orange">
                    <a href={`#${tocItem.id}`} className="block w-full">
                      {tocItem.text}
                    </a>
                  </li>
                );
              default:
                return (
                  <li key={tocItem.id} className="ml-6 cursor-pointer hover-orange">
                    <a href={`#${tocItem.id}`} className="block w-full">
                      {tocItem.text}
                    </a>
                  </li>
                );
            }
          })}
        </ul>
      </div>
    </div>
  );
}
