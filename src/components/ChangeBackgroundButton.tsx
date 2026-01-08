import generateIcon from "../assets/icons/generate.svg";

interface ChangeBackgroundButtonProps {
  onClick: () => void;
}

export function ChangeBackgroundButton({
  onClick,
}: ChangeBackgroundButtonProps) {
  return (
    <button
      onClick={onClick}
      className="absolute top-4 left-4 right-4 bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-colors rounded-xl px-4 py-3 flex items-center justify-center gap-2 font-medium text-white cursor-pointer"
      style={{ backgroundColor: "#00000033" }}
    >
      <img src={generateIcon} alt="" width="20" height="20" />
      Change background
    </button>
  );
}
