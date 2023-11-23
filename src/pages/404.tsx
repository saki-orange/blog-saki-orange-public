import { NextSeo } from "next-seo";
import { BASE_URL } from "../../blog.config";

import Locator from "../components/Locator";

export default function Custom404() {
  return (
    <>
      <NextSeo
        {...{
          title: "エラー",
          noindex: true,
          description: "お探しのページが見つかりませんでした",
          openGraph: {
            title: "エラー",
            description: "お探しのページが見つかりませんでした",
            url: `${BASE_URL}/404`,
          },
        }}
      />
      <Locator dispList={["エラー"]} />
      <div className=" text-lg absolute border-b-2 border-dashed pb-1.5 border-b-sGray top-1/2 left-1/2 -translate-x-1/2 -translate-y-20">
        404 お探しのページが見つかりませんでした
      </div>
    </>
  );
}
