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
import { frameworkData } from "@/data/frameworkData";
import { libntoolsData } from "@/data/libntoolsData";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { dbData } from "@/data/dbData";
import { skillsData } from "@/data/skillsData";
export default function AboutMe({
  width,
  height,
  position = { top: 100, left: 100 },
  isClosing = false,
}) {
  return (
    <div
      className={`fixed rounded-2xl bg-black/50 backdrop-blur-lg overflow-hidden select-none transition-all duration-200 ease-in-out z-[10000] ${
        isClosing ? "opacity-0 scale-95" : "opacity-100 scale-100"
      }`}
      style={{
        width: width,
        height: height,
        top: position.top,
        left: position.left,
      }}
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      onMouseUp={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
      onTouchEnd={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
      onPointerUp={(e) => e.stopPropagation()}
    >
      <FlickeringGrid
        className="absolute inset-0 pointer-events-none rounded-2xl"
        maxOpacity={0.2}
        width={width}
        height={height}
        color="black"
      />
      {/* Foreground content (Bento grid placeholder) */}
      <div className="relative z-10 w-full h-full p-2 backdrop-blur-lg  overflow-auto rounded-2xl">
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
                  <p className="absolute text-[15px] text-left top-20 space-y-1 p-5">
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
            className="col-span-1 row-span-1"
            name="Languages"
            description=""
            cta=""
            href="#"
            background={
              <div className="flex pl-[10px]">
                <Image
                  src="/language-icon.png"
                  alt="languages-icon"
                  width={100}
                  height={100}
                  className="absolute -bottom-[30px] -right-[10px]"
                />
                <AvatarGroup
                  side="bottom"
                  alignOffset={5}
                  className="mx-[5px] flex justify-end"
                >
                  {langData.map((avatar, index) => (
                    <Avatar key={index} className="size-7 top-5">
                      <AvatarImage src={avatar.src} />
                      <AvatarFallback>{avatar.fallback}</AvatarFallback>
                      <AvatarGroupTooltip size="sm">
                        {avatar.tooltip}
                      </AvatarGroupTooltip>
                    </Avatar>
                  ))}
                </AvatarGroup>
              </div>
            }
          ></BentoCard>

          <BentoCard
            className="col-span-1 row-span-1"
            name="Frameworks"
            description=""
            cta=""
            href="#"
            background={
              <div className="flex pl-[10px]">
                <Image
                  src="/framework-icon.png"
                  alt="frameworks-icon"
                  width={100}
                  height={100}
                  className="absolute -bottom-[30px] -right-[10px]"
                />
                <AvatarGroup
                  side="bottom"
                  alignOffset={10}
                  className="ml-[10px]"
                >
                  {frameworkData.map((avatar, index) => (
                    <Avatar key={index} className="size-7 top-5 ">
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
            name="Databases"
            description=""
            href="#"
            background={
              <div className="absolute pl-[10px]">
                <link
                  rel="stylesheet"
                  type="text/css"
                  href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
                />
                <AvatarGroup
                  className="pl-2 pt-6"
                  sideOffset={10}
                  side="bottom"
                  alignOffset={10}
                >
                  {dbData.map((avatar, index) => (
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
            className="col-span-1 row-span-1 "
            name="Skills"
            description=""
            href="#"
            background={
              <div className="absolute inset-0 -top-20 w-[80%] pl-[20px] flex justify-start items-center">
                <link
                  rel="stylesheet"
                  type="text/css"
                  href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
                />
                <AvatarGroup
                  className="gap-1"
                  sideOffset={10}
                  side="bottom"
                  alignOffset={50}
                >
                  {skillsData.map((avatar, index) => (
                    <Avatar key={index}>
                      <AvatarImage src={avatar.src} />
                      <AvatarFallback>{avatar.fallback}</AvatarFallback>
                      <AvatarGroupTooltip>{avatar.tooltip}</AvatarGroupTooltip>
                    </Avatar>
                  ))}
                </AvatarGroup>
                {/* <Image
                  src="/agile-icon.png"
                  alt="agile-icon"
                  width={300}
                  height={300}
                  className="absolute top-[60px] -right-[90px] rotate-[30deg]"
                /> */}
                <Image
                  src="/cicd-icon.png"
                  alt="cicd-icon"
                  width={150}
                  height={150}
                  className="absolute -bottom-[5px] -right-[50px] rotate-[20deg]"
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
            className="col-span-1 row-span-1 flex justfy-start w-full"
            name="Tools & Libraries"
            description=""
            cta=""
            href="#"
            background={
              <div className="flex w-full flex-col items-start gap-5 mb-12 h-full justify-end pb-[25px]">
                <AvatarGroup
                  side="top"
                  className="pl-[15px] pt-[10px]"
                  alignOffset={10}
                >
                  {libntoolsData.map((avatar, index) => (
                    <Avatar key={index}>
                      <AvatarImage src={avatar.src} />
                      <AvatarFallback>{avatar.fallback}</AvatarFallback>
                      <AvatarGroupTooltip>{avatar.tooltip}</AvatarGroupTooltip>
                    </Avatar>
                  ))}
                </AvatarGroup>
              </div>
            }
          ></BentoCard>
        </BentoGrid>
      </div>
    </div>
  );
}
