import { Clock, House, LucideIcon, Shell, Scroll, Shuffle } from "lucide-react";
import Link from "next/link";

type Tabs = {
  title: string;
  icon: LucideIcon;
  href: string;
};

const tabs: Tabs[] = [
  {
    title: "Home",
    icon: House,
    href: "/",
  },
  {
    title: "Timeline",
    icon: Clock,
    href: "/timeline",
  },
  {
    title: "Desejos",
    icon: Scroll,
    href: "/wishlist",
  },
  {
    title: "Planos",
    icon: Shuffle,
    href: "/planos",
  },
];

export default function NavBar() {
  return (
    <div
      className="
        fixed bottom-0 left-0
        w-full
        flex items-center justify-around
        border-t border-border
        p-4
        bg-background
        backdrop-blur-md
        z-50
      "
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;

        return (
          <div
            key={tab.title}
            className="flex flex-col gap-1 items-center text-sm text-primary"
          >
            <Link href={tab.href} className="flex flex-col items-center">
              <Icon />
              <span>{tab.title}</span>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
