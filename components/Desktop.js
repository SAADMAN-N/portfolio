import Dock from "./Dock";
import Hero from "./Hero";
import Menubar from "./MenuBar";
import DockIcon from "./DockIcon";

export default function Desktop() {
  return (
    <div className="desktop-wallpaper" style={{ backgroundColor: "#F5F2E8" }}>
      <Menubar />
      <Hero />
      <Dock />
    </div>
  );
}
