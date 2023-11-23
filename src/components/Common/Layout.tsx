import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="max-w-screen-xl mx-auto ">{children}</div>
      <Footer />
    </>
  );
}
