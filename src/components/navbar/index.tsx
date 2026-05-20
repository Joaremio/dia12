import { Clock, House, LucideIcon } from "lucide-react";

type Tabs = {
  title: string;
  icon: LucideIcon;
};

const tabs: Tabs[] = [
  {
    title: "Home",
    icon: House,
  },
  {
    title: "Timeline",
    icon: Clock,
  },
  {
    title: "Roleta",
    icon: Clock,
  },
  {
    title: "Desejos",
    icon: Clock,
  },
];

export default function NavBar() {
  return (
    <div className="flex items-center justify-around border-t border-border p-4 ">
      {tabs.map((tab) => {
        const Icon = tab.icon;

        return (
          <div
            key={tab.title}
            className="flex flex-col gap-1 items-center text-sm text-primary"
          >
            <Icon />
            <span>{tab.title}</span>
          </div>
        );
      })}
    </div>
  );
}
