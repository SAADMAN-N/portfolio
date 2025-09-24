import Hero from "./Hero";
import Menubar from "./MenuBar";

export default function Desktop() {
  return (
    <div className="desktop-wallpaper" style={{ backgroundColor: "#F5F2E8" }}>
      <Menubar />
      <Hero />
    </div>
  );
}
