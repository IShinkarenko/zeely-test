import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  className?: string;
  showCloseButton?: boolean;
  title?: string;
}

export function Drawer({
  open,
  onClose,
  children,
  side = "right",
  className,
  showCloseButton = true,
  title,
}: DrawerProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (open) {
      setTimeout(() => setIsAnimating(true), 10);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!open) return null;

  const sideStyles = {
    right: {
      position: "right-0 top-0 h-full",
      animation: isAnimating ? "translate-x-0" : "translate-x-full",
    },
    left: {
      position: "left-0 top-0 h-full",
      animation: isAnimating ? "translate-x-0" : "-translate-x-full",
    },
    top: {
      position: "top-0 left-0 w-full",
      animation: isAnimating ? "translate-y-0" : "-translate-y-full",
    },
    bottom: {
      position: "bottom-0 left-0 w-full",
      animation: isAnimating ? "translate-y-0" : "translate-y-full",
    },
  };

  const currentStyle = sideStyles[side];

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-40 transition-opacity duration-300",
          isAnimating ? "opacity-100" : "opacity-0"
        )}
        onClick={handleClose}
      />

      <div
        className={cn(
          "fixed bg-white z-50 shadow-2xl transition-transform duration-300 ease-in-out",
          currentStyle.position,
          currentStyle.animation,
          className
        )}
      >
        {title && (
          <div className="px-5 pt-8 pb-6 border-b flex items-center justify-between">
            <h2 className="text-[22px] font-bold">{title}</h2>
            {showCloseButton && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="hover:bg-gray-100"
              >
                <X className="w-6 h-6" />
              </Button>
            )}
          </div>
        )}

        {!title && showCloseButton && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="absolute top-6 right-6 hover:bg-gray-100 z-10"
          >
            <X className="w-6 h-6" />
          </Button>
        )}

        {children}
      </div>
    </>
  );
}
