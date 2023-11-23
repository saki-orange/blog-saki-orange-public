import Link from "next/link";

const Footer = () => {
  return (
    <footer className="absolute p-7 text-center bottom-0 inset-x-0 bg-white">
      <ul className="footer__ul pb-4 flex flex-col md:flex-row justify-center space-y-2 md:space-y-0 md:space-x-3">
        <li className="hover:underline">
          <Link href="/privacypolicy">プライバシーポリシー</Link>
        </li>
        {/* <li className="hover:underline">
          <Link href="">お問い合わせ</Link>
        </li> */}
      </ul>
      <p className="">&copy;&nbsp;2023&nbsp;saki_blog</p>
    </footer>
  );
};

export default Footer;
