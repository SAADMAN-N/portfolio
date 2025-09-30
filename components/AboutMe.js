import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { ComicText } from "@/components/ui/comic-text";
import { Globe } from "@/components/ui/globe";
import Image from "next/image";

export default function AboutMe({
  width,
  height,
  position = { top: 100, left: 100 },
}) {
  return (
    <div
      className="fixed rounded-2xl border-2 bg-black/75 border-black/10 backdrop-blur-lg overflow-hidden"
      style={{
        width: width,
        height: height,
        top: position.top,
        left: position.left,
      }}
    >
      {/* Background grid */}
      <FlickeringGrid
        className="absolute inset-0 pointer-events-none"
        maxOpacity={0.2}
        width={width}
        height={height}
        color="black"
      />

      {/* Foreground content (Bento grid placeholder) */}
      <div className="relative z-10 w-full h-full p-1 overflow-auto">
        {/* Put your <BentoGrid> here; this div stays above the FlickeringGrid */}
        <BentoGrid className="h-full w-full grid-cols-3 auto-rows-[10rem] gap-2 p-0 ">
          <BentoCard
            className="col-span-2 row-span-2"
            name="About Me"
            description="Who I am and what I do"
            cta="Open"
            href="#"
            background={
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute w-full top-3 left-0">
                  <ComicText fontSize={3}>Hi! I'm Sharf!</ComicText>
                </div>
                {/* Emoji to the right of the "About Me" text */}
                <Image
                  className="absolute -bottom-18.5 right-0 rotate-3 drop-shadow-md "
                  src="/waving-icon.png"
                  alt="Waving Sharf illustration"
                  width={250}
                  height={250}
                />
              </div>
            }
          />
          <BentoCard
            className="col-span-1 row-span-1"
            name="I love to travel"
            description="If you see me, ask me where I'm going next! (I probably have tickets booked)"
            cta="Open"
            href="#"
            background={
              <div className="absolute inset-0 z-0 pointer-events-none flex items-start justify-end p-4">
                <Globe className="w-[435px] h-[435px]" />
              </div>
            }
          />
          <BentoCard
            className="col-span-1 row-span-1"
            name="Weekend Builds"
            description="Tiny projects I hack on to learn fast and ship faster."
            cta="See builds"
            href="#"
            background={null}
          />
          <BentoCard
            className="col-span-1 row-span-1"
            name="Speedrunners"
            description="Performance wins I'm proud of—before/after numbers inside."
            cta="View wins"
            href="#"
            background={null}
          />
          <BentoCard
            className="col-span-2 row-span-1"
            name="Favorite Debug Stories"
            description="The weirdest bugs I’ve solved and what they taught me."
            cta="Read stories"
            href="#"
            background={null}
          />
        </BentoGrid>
      </div>
    </div>
  );
}
