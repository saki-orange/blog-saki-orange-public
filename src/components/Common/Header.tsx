import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-white py-5 shadow shadow-sGray">
      <nav className="px-4 flex justify-between items-center max-w-screen-xl mx-auto">
        <h1 className="text-lg">
          <Link href="/">saki_blog</Link>
        </h1>
        <ul className="flex space-x-2">
          {/* <li className=" hover:underline">
            <Link href="">About</Link>
          </li>
          <li className=" hover:underline">
            <Link href="">Twitter</Link>
          </li> */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
