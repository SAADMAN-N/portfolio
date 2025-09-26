import Image from "next/image";

export default function Window({ title, position, bio }) {
  return (
    <div
      className="relative h-150 w-200 rounded-2xl flex justify-between bg-transparent"
      style={{ top: position.top, left: position.left }}
    >
      {/* Sidebar */}
      <div className="w-50 h-full rounded-l-2xl flex flex-col justify-between bg-[#1c1c1e]/70 backdrop-blur-xl border-r border-[#2c2c2e]">
        <div className="flex h-10 rounded-tl-2xl p-3 gap-2">
          <Image src="/close-icon.svg" alt="Close" width={10} height={10} />
          <Image src="/minimize-icon.svg" alt="Close" width={10} height={10} />
          <Image src="/maximize-icon.svg" alt="Close" width={10} height={10} />
        </div>

        <div className="flex flex-col h-full rounded-bl-2xl justify-between">
          <div className="h-full w-full flex flex-col pl-4 pr-3 pt-6 gap-3">
            <div className="text-[11px] tracking-wide uppercase text-[#8e8e93]">
              Favorites
            </div>
            <button className="flex items-center gap-2 w-full px-2 py-1 rounded-md hover:bg-[#6A6868]/70 focus:bg-[#6A6868] text-left">
              <Image
                className="inline-block opacity-90"
                src="/work-icon.svg"
                alt="Work icon"
                width={18}
                height={18}
              />
              <span className="text-[13px] text-[#e5e5ea]">Experience</span>
            </button>
          </div>
          <div className="w-full pl-4 pr-3 pb-4">
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
          <div className="text-[13px] font-medium text-[#f2f2f7]">{title}</div>
          <div className="text-[11px] text-[#000000]">{bio}</div>
        </div>

        {/* Content area */}
        <div className="w-full h-full rounded-br-2xl pl-10 bg-[#1c1c1e]/85 text-[#d1d1d6]">
          <div>Content</div>
        </div>
      </div>
    </div>
  );
}
