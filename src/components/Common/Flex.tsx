export default function Flex({ children }: { children: React.ReactNode }) {
  return <div className="px-3 pb-40 flex justify-between">{children}</div>;
}
