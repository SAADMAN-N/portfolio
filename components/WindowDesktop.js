"use client";

import { sidebarFolders } from "@/data/sidebarFolders";
import { getContent } from "@/data/contentData";
import Image from "next/image";
import { useState } from "react";
import { LinkPreview } from "@/components/ui/link-preview";

export default function WindowDesktop({
  title,
  position,
  bio,
  desktopItem,
  onClose,
  width,
  height,
  content,
  style,
}) {
  const [selectedSidebarItem, setSelectedSidebarItem] = useState(null);

  return (
    <div
      className="fixed rounded-2xl flex justify-between bg-transparent select-none border-1 border-black/6 b-rounded-sm "
      style={{
        top: position.top,
        left: position.left,
        width: width || 800,
        height: height || 600,
        zIndex: style?.zIndex || 9998,
      }}
    >
      {/* Sidebar */}
      <div className="w-48 h-full rounded-l-2xl px-2 flex flex-col justify-start bg-[#1c1c1e] border-r border-[#2c2c2e]">
        <div className="flex h-10 rounded-tl-2xl p-3 gap-2 items-center">
          <div
            className="relative group cursor-pointer w-[12px] h-[12px]"
            onClick={onClose}
            title="Close"
          >
            <Image src="/close-icon.svg" alt="Close" width={12} height={12} />
            <Image
              src="/cross-icon.svg"
              alt="Close overlay"
              width={6}
              height={6}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-60 transition-opacity pointer-events-none"
            />
          </div>
          <div className="w-[12px] h-[12px]">
            <Image
              src="/minimize-icon.svg"
              alt="Minimize"
              width={12}
              height={12}
            />
          </div>
          <div className="w-[12px] h-[12px]">
            <Image
              src="/maximize-icon.svg"
              alt="Maximize"
              width={12}
              height={12}
            />
          </div>
        </div>

        <div className="flex flex-col rounded-bl-2xl justify-between">
          <div className=" w-full flex flex-col pt-6 gap-3">
            <div className="text-[11px] tracking-wide pl-4 uppercase text-[#8e8e93]">
              Favorites
            </div>

            <div className="flex flex-col gap-2">
              {sidebarFolders.map(({ id, title, icon, bio }) => (
                <button
                  key={id}
                  className="flex items-center gap-2 pl-4  py-1 rounded-md hover:bg-[#2c2c2e]/70 focus:bg-[#2c2c2e] text-left"
                  onClick={() =>
                    setSelectedSidebarItem({ id, title, icon, bio })
                  }
                >
                  <Image
                    className="inline-block opacity-90"
                    src={icon}
                    alt={`${title} icon`}
                    width={18}
                    height={18}
                  />
                  <span className="text-[13px] text-[#e5e5ea]">{title}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="w-full pt-10 pl-4 pr-3 pb-4">
            <div className="text-[11px] tracking-wide uppercase text-[#8e8e93]">
              Recents
            </div>
          </div>
        </div>
      </div>

      {/* Right pane */}
      <div className="flex flex-col w-full justify-between items-center">
        {/* Toolbar/Header */}
        <div className="w-full h-16 rounded-tr-2xl p-0 m-0 pt-4 pl-10 bg-[#2c2c2e] border-b border-[#2c2c2e]">
          <div className="text-[14px] font-medium text-[#f2f2f7]">
            {selectedSidebarItem ? selectedSidebarItem.title : title}
          </div>
          <div className="text-[12px] text-[rgb(102,238,229)]">
            {selectedSidebarItem ? selectedSidebarItem.bio : bio}
          </div>
        </div>

        {/* Content area */}
        <div className="w-full h-full rounded-br-2xl p-10 bg-[#363636] text-[#d1d1d6]">
          <div className="flex flex-wrap gap-6">
            {content && content.items
              ? // Custom content for About Me windows
                content.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center cursor-pointer hover:bg-[#2c2c2e]/30 rounded-lg p-2"
                  >
                    <LinkPreview
                      url={item.link}
                      className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-pink-500"
                      height={100}
                      quality={100}
                      isStatic={item.isStatic || false}
                      imageSrc={item.imageSrc}
                    >
                      <Image
                        src={item.icon}
                        alt={item.name}
                        width={50}
                        height={50}
                      />
                      <span className="mt-1 text-[14px] text-[#e5e5ea] text-center select-none font-semibold">
                        {item.name}
                      </span>
                    </LinkPreview>{" "}
                  </div>
                ))
              : // Default content for other windows
                getContent(desktopItem.id, selectedSidebarItem?.id).map(
                  (item) => (
                    <div
                      key={item.id}
                      className="flex flex-col items-center cursor-pointer hover:bg-[#2c2c2e]/30 rounded-lg p-2"
                    >
                      <Image
                        src={item.icon}
                        alt={item.name}
                        width={10}
                        height={10}
                      />
                      <span className="mt-1 text-[14px] text-[#e5e5ea] text-center select-none font-semibold">
                        {item.name}
                      </span>
                    </div>
                  )
                )}
          </div>
        </div>
      </div>
    </div>
  );
}
