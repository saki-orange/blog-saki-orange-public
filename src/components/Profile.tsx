import Image from "next/image";

import ProfileImg from "/public/images/owl.webp";
import { FaTwitter } from "react-icons/fa";

export default function Profile() {
  return (
    <div className="mb-5 p-5 box flex flex-col items-center">
      <div className="w-1/2 mb-2 rounded-full overflow-hidden">
        <Image src={ProfileImg} alt="profile image" priority />
      </div>
      <p className="mb-2 text-lr">saki</p>
      <p className="text-sm mb-3">つまずいたところをまとめてます</p>
      <p className="text-center">
        <a href="https://twitter.com/saki_orange_owl" target="_blank" rel="noopener">
          <FaTwitter size={20} color="#757575" title="Twitter" />
        </a>
      </p>
    </div>
  );
}
