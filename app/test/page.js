import WindowDesktop from "@/components/WindowDesktop";
import desktopItems from "@/data/desktopItems";

export default function Test() {
  return (
    <>
      {desktopItems.map(
        (item) =>
          item.id === 2 && (
            <WindowDesktop
              key={item.id}
              title={item.label}
              position={item.position}
              bio={item.bio}
              desktopItem={item}
            />
          )
      )}
    </>
  );
}
