import Image from "next/image";

export default function Window({ title, position, bio }) {
  return (
    <div
      className="relative h-150 w-200 rounded-2xl flex justify-between bg-transparent"
      style={{ top: position.top, left: position.left }}
    >
      <div className="w-50 h-full bg-black/70 rounded-l-2xl flex flex-col justify-between">
        <div className="flex h-10 rounded-tl-2xl p-3 gap-2">
          <Image src="/close-icon.svg" alt="Close" width={10} height={10} />
          <Image src="/minimize-icon.svg" alt="Close" width={10} height={10} />
          <Image src="/maximize-icon.svg" alt="Close" width={10} height={10} />
        </div>

        <div className="flex flex-col h-full rounded-bl-2xl justify-evenly items-center">
          <div className="h-full w-full flex flex-col pl-5 pt-10 font-medium text-gray-200/90 text-sm">
            <div>Favourites</div>
            <a>
              <Image
                src="/work-icon.png"
                alt="Work icon"
                width={15}
                height={15}
              />
            </a>
          </div>
          <div className="h-full w-full flex pl-5 font-medium text-gray-200/90 text-sm">
            Recents
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full justify-between items-center">
        <div className="bg-black/60 w-full h-16 rounded-tr-2xl p-0 m-0 pt-2 pl-10">
          <div className=" font-semibold">{title}</div>
          <div className=" text-sm text-blue-400">{bio}</div>
        </div>

        <div className="bg-black/80 w-full h-full rounded-br-2xl">Content</div>
      </div>
    </div>
  );
}
