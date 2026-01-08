import { X, ChevronLeft, Check } from "lucide-react";
import { Button } from "./ui/button";

interface NavItem {
  label: string;
  checked?: boolean;
  active?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Product", checked: true },
  { label: "Template", checked: true },
  { label: "Avatar", active: true },
  { label: "Content" },
  { label: "Text hook" },
  { label: "Script" },
  { label: "Music" },
  { label: "Summary" },
];

export function Navigation() {
  return (
    <div className="flex items-center justify-between h-[73px] px-6 border-b border-gray-200">
      <ChevronLeft className="w-5 h-5 cursor-pointer" />

      <div className="flex items-center gap-2">
        {NAV_ITEMS.map((item) => (
          <Button
            key={item.label}
            variant={item.active ? "outlineActive" : "outline"}
            size="pill"
            icon={item.checked ? <Check className="w-4 h-4" /> : null}
          >
            {item.label}
          </Button>
        ))}
      </div>

      <X className="w-5 h-5 cursor-pointer" />
    </div>
  );
}
