import type * as React from "react";
import { cn } from "@/lib/utils";
import type { Background } from "@/types";
import { CircularProgress } from "./CircularProgress";

interface BackgroundCardProps {
  background: Background;
  isSelected: boolean;
  isGenerating?: boolean;
  progress?: number;
  timeRemaining?: string;
  onClick: (id: string) => void;
  width?: string;
  height?: string;
  useAspectRatio?: boolean;
}

export const BackgroundCard: React.FC<BackgroundCardProps> = ({
  background,
  isSelected,
  isGenerating = false,
  progress = 0,
  timeRemaining,
  onClick,
  width = "w-full",
  height,
  useAspectRatio = true,
}) => {
  return (
    <div
      onClick={() => onClick(background.id)}
      className={cn(
        "relative rounded-2xl overflow-hidden transition-all duration-200 cursor-pointer",
        width,
        height,
        useAspectRatio && "aspect-[112/198]",
        isSelected
          ? "ring-2 ring-black ring-offset-0"
          : "hover:ring-2 hover:ring-black"
      )}
    >
      <img
        src={background.imageUrl}
        alt="Background"
        className="w-full h-full object-cover"
      />

      {/* Default badge */}
      {background.isDefault && !isGenerating && (
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-1 py-1.5 rounded-[5px] border border-[#E0E0E0] text-[10px] font-semibold flex items-center gap-1.5">
          DEFAULT
        </div>
      )}

      {/* Generating overlay */}
      {isGenerating && (
        <CircularProgress progress={progress} timeRemaining={timeRemaining} />
      )}
    </div>
  );
};
