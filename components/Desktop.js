import Dock from "./Dock";
import Hero from "./Hero";
import Menubar from "./MenuBar";
import DesktopItem from "./DesktopItem";
import desktopItems from "@/data/desktopItems";

export default function Desktop() {
  return (
    <div className="desktop-wallpaper" style={{ backgroundColor: "#F5F2E8" }}>
      <Menubar />
      <Hero />
      {desktopItems.map((item) => (
        <DesktopItem
          key={item.id}
          icon={item.icon}
          label={item.label}
          position={item.position}
          type={item.type}
        />
      ))}
      <Dock />
    </div>
  );
}
