import { NextSeo } from "next-seo";
import { BASE_URL } from "../../blog.config";
import Aside from "../components/Common/Aside";
import Profile from "../components/Profile";
import Main from "../components/Common/Main";
import Flex from "../components/Common/Flex";
import Locator from "../components/Locator";

export default function PrivacyPolicy() {
  return (
    <>
      <NextSeo
        {...{
          title: "プライバシーポリシー",
          noindex: true,
          description: "プライバシーポリシー",
          openGraph: {
            title: "プライバシーポリシー",
            description: "プライバシーポリシー",
            url: `${BASE_URL}/privacypolicy`,
          },
        }}
      />
      <Locator dispList={["プライバシーポリシー"]} />
      <Flex>
        <Main>
          <div className="overflow-hidden box">
            <div className="p-4 sm:p-5">
              <div className="overflow-hidden">
                <h1 className="mb-4 font-bold text-lg">プライバシーポリシー</h1>
                <div className="hr"></div>
                <div className="px-1 py-4 min-w-full prose text-cBlack">
                  {/* <h3>基本方針</h3>
                  <div>
                    当サイトは、個人情報の重要性を認識し、個人情報を保護することが社会的責務であると考え、個人情報に関する法令を遵守し、当サイトで取扱う個人情報の取得、利用、管理を適正に行います。
                  </div>
                  <h3>適用範囲</h3>
                  <div>
                    本プライバシーポリシーは、お客様の個人情報もしくはそれに準ずる情報を取り扱う際に、当サイトが遵守する方針を示したものです。
                  </div> */}
                  <div>
                    saki_blog&nbsp;(以下「当ブログ」)のプライバシーポリシー・免責事項を次の通り記載します。
                  </div>
                  <h3>個人情報の利用目的について</h3>
                  <div>
                    当ブログでは、お問い合わせやコメント投稿の際に氏名・メールアドレス等の個人情報を入力いただく場合があります。
                    取得した個人情報は、必要な連絡のみに利用させていただくもので、これらの目的以外では利用いたしません。
                  </div>
                  <h3>個人情報の第三者開示について</h3>
                  <div>
                    取得した個人情報は適切に管理し、以下に該当する場合を除いて第三者に開示することはありません。
                    <ul>
                      <li>本人の同意が得られた場合</li>
                      <li>法令により開示が求められた場合</li>
                    </ul>
                  </div>
                  <h3>Cookieの使用について</h3>
                  <div>
                    当ブログでは、広告配信やアクセス解析のためにCookieを使用しています
                    Cookieによりブラウザを識別していますが、特定の個人の識別はできない状態で匿名性が保たれています。
                    Cookieの使用を望まない場合、ブラウザからCookieを無効に設定できます。
                  </div>
                  <h3>アクセス解析ツールについて</h3>
                  <div>
                    当ブログでは、Googleアナリティクスによりアクセス情報を解析しています。
                    アクセス情報の解析にはCookieを使用しています。また、アクセス情報の収集はCookieを無効にすることで拒否できます。
                    Google社のデータ収集・処理の仕組みについては、
                    <a href="https://policies.google.com/technologies/partner-sites?hl=ja">
                      こちら
                    </a>
                    をご覧ください。
                  </div>
                  <h3>免責事項</h3>
                  <div>
                    当ブログは、掲載内容によって生じた損害に対する一切の責任を負いません。
                    各コンテンツでは、できる限り正確な情報提供を心がけておりますが、正確性や安全性を保証するものではありません。
                    また、リンク先の他サイトで提供される情報・サービスについても、責任を負いかねますのでご了承ください。
                    {/* 当ブログからのリンクやバナーなどで移動したブログで提供される情報、サービス等について一切の責任を負いません。
                    また当ブログのコンテンツ・情報について、できる限り正確な情報を提供するように努めておりますが、正確性や安全性を保証するものではありません。情報が古くなっていることもございます。
                    当ブログに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。 */}
                  </div>
                  <h3>著作権</h3>
                  <div>
                    当ブログに掲載されている文章・画像の著作権は、運営者に帰属しています。
                    法的に認められている引用の範囲を超えて、無断で転載することを禁止します。
                  </div>
                  <h3>プライバシーポリシーの変更</h3>
                  <div>
                    <div>
                      当ブログは、個人情報に関して適用される日本の法令を遵守するとともに、本プライバシーポリシーの内容を適宜見直して改善に努めます。
                    </div>
                    <div>
                      修正された最新のプライバシーポリシーは常に本ページにて開示されます。
                    </div>
                    <br />
                    <div>制定日：2023年8月14日</div>
                    <div>saki_blog</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Main>
        <Aside>
          <Profile />
        </Aside>
      </Flex>
    </>
  );
}
