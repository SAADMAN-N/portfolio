import { sidebarFolders } from "@/data/sidebarFolders";
import Image from "next/image";

export default function Window({ title, position, bio }) {
  return (
    <div
      className="relative h-150 w-200 rounded-2xl flex justify-between bg-transparent"
      style={{ top: position.top, left: position.left }}
    >
      {/* Sidebar */}
      <div className="w-50 h-full rounded-l-2xl px-2 flex flex-col justify-start bg-[#1c1c1e]/70 backdrop-blur-xl border-r border-[#2c2c2e]">
        <div className="flex h-10 rounded-tl-2xl p-3 gap-2">
          <Image src="/close-icon.svg" alt="Close" width={10} height={10} />
          <Image src="/minimize-icon.svg" alt="Close" width={10} height={10} />
          <Image src="/maximize-icon.svg" alt="Close" width={10} height={10} />
        </div>

        <div className="flex flex-col rounded-bl-2xl justify-between">
          <div className=" w-full flex flex-col pt-6 gap-3">
            <div className="text-[11px] tracking-wide pl-4 uppercase text-[#8e8e93]">
              Favorites
            </div>

            <div className="flex flex-col gap-2">
              {sidebarFolders.map(({ id, title, icon }) => (
                <button className="flex items-center gap-2 pl-4  py-1 rounded-md hover:bg-[#2c2c2e]/70 focus:bg-[#2c2c2e] text-left">
                  <Image
                    className="inline-block opacity-90"
                    src={icon}
                    alt={`{title} icon`}
                    width={18}
                    height={18}
                  />
                  <span className="text-[13px] text-[#e5e5ea]">{title}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="w-full pt-4 pl-4 pr-3 pb-4">
            <div className="text-[11px] tracking-wide uppercase text-[#8e8e93]">
              Recents
            </div>
          </div>
        </div>
      </div>

      {/* Right pane */}
      <div className="flex flex-col w-full justify-between items-center">
        {/* Toolbar/Header */}
        <div className="w-full h-16 rounded-tr-2xl p-0 m-0 pt-4 pl-10 bg-[#2c2c2e]/70 backdrop-blur-xl border-b border-[#2c2c2e]">
          <div className="text-[14px] font-medium text-[#f2f2f7]">{title}</div>
          <div className="text-[12px] text-[rgb(102,238,229)]">{bio}</div>
        </div>

        {/* Content area */}
        <div className="w-full h-full rounded-br-2xl p-10  bg-[#1c1c1e]/85 text-[#d1d1d6]">
          Content
        </div>
      </div>
    </div>
  );
}
