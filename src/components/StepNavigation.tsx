import { Button } from "./ui/button";
import { ChevronLeft } from "lucide-react";

interface StepNavigationProps {
  onPrevious?: () => void;
  onContinue?: () => void;
  showPrevious?: boolean;
  continueDisabled?: boolean;
}

export function StepNavigation({
  onPrevious,
  onContinue,
  showPrevious = true,
  continueDisabled = false,
}: StepNavigationProps) {
  return (
    <div className="flex items-center justify-end gap-4 mt-8">
      {showPrevious && (
        <Button
          variant="outline"
          size="lg"
          icon={<ChevronLeft className="w-5 h-5" />}
          iconPosition="left"
          className="h-12 rounded-full px-8 text-lg font-medium"
          onClick={onPrevious}
        >
          Previous step
        </Button>
      )}
      <Button
        size="lg"
        className="h-12 rounded-full px-12 text-lg font-medium bg-black text-white hover:bg-gray-900"
        onClick={onContinue}
        disabled={continueDisabled}
      >
        Continue
      </Button>
    </div>
  );
}
