import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const Layout: React.FC<{
  color: string;
  label?: string;
  children: ReactNode;
}> = ({ color, label, children }) => {
  return (
    <div className="flex min-h-screen flex-col gap-y-2">
      <div
        className={cn(
          "flex h-[60px] items-center justify-center",
          color === "red" ? "bg-rose-700" : "bg-blue-700",
        )}
      >
        <span className="p-20 text-lg font-bold text-white">{label}</span>
      </div>
      <div className="flex-1 ">{children}</div>
    </div>
  );
};

export default Layout;
