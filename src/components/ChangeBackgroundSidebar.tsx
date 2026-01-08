import { Redo2, Undo2 } from "lucide-react";
import type * as React from "react";
import { useBackgroundStore } from "@/store/backgroundStore";
import { BackgroundCard } from "./BackgroundCard";
import { Button } from "./ui/button";
import aiIcon from "@/assets/icons/ai.svg";
import type { Avatar } from "@/mocks/avatars";

interface ChangeBackgroundSidebarProps {
  selectedAvatar: Avatar;
}

export const ChangeBackgroundSidebar: React.FC<
  ChangeBackgroundSidebarProps
> = ({ selectedAvatar }) => {
  const {
    prompt,
    status,
    progress,
    timeRemaining,
    backgrounds,
    selectedBackgroundId,
    promptHistory,
    historyIndex,
    setPrompt,
    generateBackground,
    regeneratePrompt,
    selectBackground,
    undoPrompt,
    redoPrompt,
  } = useBackgroundStore();

  const isGenerating = status === "generating";
  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < promptHistory.length - 1;

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex-1 overflow-y-auto px-5 py-8 space-y-6">
        <div className="space-y-4">
          <h3 className="text-[14px] font-medium">Background idea</h3>
          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-[360px] h-[195px] p-4 pt-4 border border-[#F2F4F6] rounded-xl resize-none text-sm font-medium leading-[140%] focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="Describe your background idea..."
              disabled={isGenerating}
            />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={regeneratePrompt}
                disabled={isGenerating}
                icon={<img src={aiIcon} alt="" className="w-[18px] h-[18px]" />}
                iconPosition="left"
                className="gap-2  hover:bg-gray-100 rounded-lg text-[12px] font-medium"
              >
                Regenerate
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className=" hover:bg-gray-100 rounded-lg"
                  disabled={isGenerating || !canUndo}
                  onClick={undoPrompt}
                  icon={<Undo2 className="w-5 h-5 text-gray-400" />}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className=" hover:bg-gray-100 rounded-lg"
                  disabled={isGenerating || !canRedo}
                  onClick={redoPrompt}
                  icon={<Redo2 className="w-5 h-5 text-gray-400" />}
                />
              </div>
            </div>
          </div>
        </div>

        <Button
          onClick={generateBackground}
          disabled={isGenerating}
          icon={<img src={aiIcon} alt="" className="w-5 h-5" />}
          iconPosition="left"
          className="w-full h-12 text-sm font-semibold leading-[80%] rounded-3xl bg-black hover:bg-gray-800 text-white mb-8"
        >
          Generate BG for 1 credit
        </Button>

        <div className="space-y-4">
          <h3 className="text-[14px] font-medium">Your backgrounds</h3>
          <div className="grid grid-cols-3 gap-4">
            {backgrounds.map((bg, index) => (
              <BackgroundCard
                key={bg.id}
                background={{ ...bg, imageUrl: selectedAvatar.image }}
                isSelected={selectedBackgroundId === bg.id}
                isGenerating={isGenerating && index === 0}
                progress={progress}
                timeRemaining={timeRemaining}
                onClick={selectBackground}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
