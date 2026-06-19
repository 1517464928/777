interface Props { children: React.ReactNode; className?: string; }
export default function Card({ children, className = "" }: Props) {
  return <div className={"relative bg-white rounded-xl shadow-sm border border-[#1a1a1a]/5 p-6 " + className}>{children}</div>;
}
