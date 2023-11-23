export default function Main({ children }: { children: React.ReactNode }) {
  // return <main className="w-full  md:w-[74%]">{children}</main>;
  return <main className="w-full  md:w-[calc(100%_-_280px)]">{children}</main>;
}
