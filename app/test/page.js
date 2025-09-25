import Window from "@/components/Window";
import desktopItems from "@/data/desktopItems";

export default function Test() {
  return (
    <>
      {desktopItems.map(
        (item) =>
          item.id === 2 && (
            <Window
              key={item.id}
              title={item.label}
              position={item.position}
              bio={item.bio}
            />
          )
      )}
    </>
  );
}
