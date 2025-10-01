import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { langData } from "@/data/langData";
import { Globe } from "@/components/ui/globe";
import Image from "next/image";
import { MorphingText } from "@/components/ui/morphing-text";
import { Highlighter } from "@/components/ui/highlighter";
import { techstackData } from "@/data/techstackData";
import {
  AvatarGroup,
  AvatarGroupTooltip,
} from "@/components/animate-ui/primitives/animate/avatar-group.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { OrbitingCircles } from "@/components/ui/orbiting-circles";
export default function AboutMe({
  width,
  height,
  position = { top: 100, left: 100 },
}) {
  return (
    <div
      className="fixed rounded-2xl border-2 border-background bg-black/50 backdrop-blur-lg overflow-hidden select-none"
      style={{
        width: width,
        height: height,
        top: position.top,
        left: position.left,
      }}
    >
      <FlickeringGrid
        className="absolute inset-0 pointer-events-none rounded-2xl"
        maxOpacity={0.2}
        width={width}
        height={height}
        color="black"
      />
      {/* Foreground content (Bento grid placeholder) */}
      <div className="relative z-10 w-full h-full p-1  backdrop-blur-lg  overflow-auto rounded-2xl">
        {/* Put your <BentoGrid> here; this div stays above the FlickeringGrid */}
        <BentoGrid
          className="h-full  w-full grid-cols-3 rounded-2xl  auto-rows-[10rem] gap-2 p-0 backdrop-blur-lg "
          background="white"
        >
          <BentoCard
            className="col-span-2 row-span-2"
            name=""
            description=""
            cta="Open"
            href="#"
            background={
              <div className="absolute inset-0 h-full pointer-events-none">
                <div className="absolute w-full h-full top-3 left-0 flex justify-center">
                  <MorphingText
                    texts={["Hi!", "I'm Sharf!"]}
                    className="w-full absolute left-0 text-left ml-[15px]"
                  />
                  <p className="absolute text-[15px] p-5 text-left top-20 space-y-1">
                    {/* Hey, here's my "About Me" intro with some fun highlights and underlines! */}
                    Hello, I’m{" "}
                    <Highlighter
                      action="underline"
                      color="yellow"
                      delayMs={0}
                      isView={true}
                    >
                      Sharfuzzaman Noor Sadman
                    </Highlighter>
                    . I’m an aspiring <br />
                    <Highlighter
                      action="highlight"
                      color="#2997FF"
                      delayMs={400}
                      isView={true}
                    >
                      Software Engineer
                    </Highlighter>{" "}
                    (and a closet-designer 👀) from{" "}
                    <Highlighter
                      action="highlight"
                      color="#006a4e"
                      delayMs={800}
                      isView={true}
                    >
                      Bangladesh
                    </Highlighter>{" "}
                    🇧🇩, currently a senior studying{"  "}
                    <Highlighter
                      action="underline"
                      color="orange"
                      delayMs={1200}
                      isView={true}
                    >
                      Computer Science
                    </Highlighter>{" "}
                    at{" "}
                    <Highlighter
                      action="underline"
                      color="white"
                      delayMs={1600}
                      isView={true}
                    >
                      Michigan State University
                    </Highlighter>
                    .<br />
                    {/* If you want to see what didn't work, I also tried: */}
                    {/*
                    <Highlighter action="highlight" color="#FF9800">
                      Frontend Engineer
                    </Highlighter>
                    but it looked too strong for the flow!
                    */}
                  </p>
                </div>
                {/* Emoji to the right of the "About Me" text */}
                <Image
                  className="absolute top-[192px]  -right-[10px] drop-shadow-md "
                  src="/waving-icon.png"
                  alt="Waving Sharf illustration"
                  width={250}
                  height={250}
                />
              </div>
            }
          />
          <BentoCard
            className="col-span-1 row-span-2 "
            name="My techstack"
            description=""
            cta="View wins"
            href="#"
            background={
              <div className="absolute inset-0 -top-20 w-[80%] flex justify-end items-center">
                <link
                  rel="stylesheet"
                  type="text/css"
                  href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
                />
                <AvatarGroup>
                  {techstackData.map((avatar, index) => (
                    <Avatar key={index}>
                      <AvatarImage src={avatar.src} />
                      <AvatarFallback>{avatar.fallback}</AvatarFallback>
                      <AvatarGroupTooltip>{avatar.tooltip}</AvatarGroupTooltip>
                    </Avatar>
                  ))}
                </AvatarGroup>
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
            className="col-span-2 row-span-1 inline-block"
            name="My Design Philosophy"
            description="I build for accessibility first. I focus on creating reusable, atmoic and 
            performant components, and creating 95+ Lighthouse Score web apps."
            href="#"
            background={
              <div className=" absolute flex-end right-0  ">
                <Image
                  src="/lighthouse-icon.png"
                  alt="100 emoji"
                  width={255}
                  height={255}
                  className="rotate-10"
                />
                <Image
                  src="/100-icon.png"
                  alt="100-emoji"
                  width={60}
                  height={60}
                  className="rotate-350 absolute -bottom-[10px] right-0"
                />
              </div>
            }
          />
          <BentoCard
            className="col-span-1 row-span-1"
            name="Languages I use"
            description=""
            cta=""
            href="#"
            background={
              <div>
                <AvatarGroup
                  side="bottom"
                  alignOffset={10}
                  className="ml-[10px]"
                >
                  {langData.map((avatar, index) => (
                    <Avatar key={index} className="size-7 top-5 ml-[3px]">
                      <AvatarImage src={avatar.src} />
                      <AvatarFallback>{avatar.fallback}</AvatarFallback>
                      <AvatarGroupTooltip>{avatar.tooltip}</AvatarGroupTooltip>
                    </Avatar>
                  ))}
                </AvatarGroup>
              </div>
            }
          ></BentoCard>

          <BentoCard
            className="col-span-1 row-span-1"
            name="Languages I use"
            description=""
            cta=""
            href="#"
            background={
              <div>
                <AvatarGroup
                  side="bottom"
                  alignOffset={10}
                  className="ml-[10px]"
                >
                  {langData.map((avatar, index) => (
                    <Avatar key={index} className="size-7 top-5 ml-[3px]">
                      <AvatarImage src={avatar.src} />
                      <AvatarFallback>{avatar.fallback}</AvatarFallback>
                      <AvatarGroupTooltip>{avatar.tooltip}</AvatarGroupTooltip>
                    </Avatar>
                  ))}
                </AvatarGroup>
              </div>
            }
          ></BentoCard>
          <BentoCard
            className="col-span-1 row-span-1"
            name="Frameworks I use"
            description=""
            cta=""
            href="#"
            background={
              <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden">
                <OrbitingCircles iconSize={40}></OrbitingCircles>
              </div>
            }
          ></BentoCard>
        </BentoGrid>
      </div>
    </div>
  );
}
