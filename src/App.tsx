import { useState } from "react";
import { Navigation } from "./components/Navigation";
import { AVATARS } from "./mocks/avatars";
import { Filters } from "./components/Filters";
import { ChangeBackgroundButton } from "./components/ChangeBackgroundButton";
import { StepNavigation } from "./components/StepNavigation";
import { ChangeBackgroundSidebar } from "./components/ChangeBackgroundSidebar";
import { Drawer } from "./components/ui/drawer";
import { BackgroundCard } from "./components/BackgroundCard";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0]);

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      <Navigation />

      <div className="flex flex-col flex-1 w-[876px] mx-auto pt-[42px] pb-[32px] min-h-0">
        <Filters />

        <div className="flex-1 flex items-center gap-4 my-6 min-h-0">
          <div className="grid grid-cols-5 gap-2 w-[571px] h-full overflow-y-auto p-1">
            {AVATARS.map((avatar) => (
              <BackgroundCard
                key={avatar.id}
                background={{
                  id: avatar.id,
                  imageUrl: avatar.image,
                  isDefault: false,
                  createdAt: new Date(),
                }}
                isSelected={selectedAvatar.id === avatar.id}
                onClick={() => setSelectedAvatar(avatar)}
                width="w-[107px]"
                height="h-[190px]"
                useAspectRatio={false}
              />
            ))}
          </div>

          <div className="w-[281px] h-full rounded-[12px] overflow-hidden relative">
            <img
              src={selectedAvatar.image}
              alt={selectedAvatar.name}
              className="w-full h-full object-cover"
            />
            <ChangeBackgroundButton onClick={() => setIsOpen(true)} />
          </div>
        </div>

        <StepNavigation />
      </div>

      <Drawer
        open={isOpen}
        onClose={() => setIsOpen(false)}
        side="right"
        className="w-[400px]"
        title="Change background"
      >
        <ChangeBackgroundSidebar selectedAvatar={selectedAvatar} />
      </Drawer>
    </div>
  );
}

export default App;
