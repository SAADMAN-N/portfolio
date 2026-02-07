import DockIcon from "./DockIcon";

export default function Dock({
  onDesktopClick,
  onFinderClick,
  onIMessageClick,
  onTrashClick,
}) {
  return (
    <div className="w-full flex justify-center fixed bottom-4 left-0 right-0 z-[9999] ">
      <div
        className="h-[50px] w-[60vw] flex justify-between items-center 
        rounded-2xl backdrop-blur-[20px]
          border border-black/10
          border-[1px]
          bg-black/40
          shadow-[0_30px_30px_rgba(0,0,0,0.2)]
          p-x-[10px] p-t p-[30px] p-b-[50px]"
        onClick={onDesktopClick}
      >
        <div
          className="relative"
          onClick={(e) => {
            e.stopPropagation();
            onFinderClick?.();
          }}
        >
          <DockIcon isClickable={true} icon="/finder-icon.png" />
        </div>

        <div className="relative">
          <DockIcon
            isClickable={false}
            icon="/settings-icon.png"
            width={38}
            height={38}
          />
        </div>

        <div className="relative">
          <DockIcon isClickable={false} icon="/launchpad-icon.png" />
        </div>

        <div className="relative">
          <DockIcon isClickable={true} icon="/notes-icon.png" />
        </div>

        <div
          className="relative"
          onClick={(e) => {
            e.stopPropagation();
            onIMessageClick?.();
          }}
        >
          <DockIcon isClickable={true} icon="/messages-icon.png" />
        </div>

        <div className="relative">
          <DockIcon isClickable={true} icon="/facetime-icon.png" />
        </div>

        <div className="relative">
          <DockIcon isClickable={false} icon="/contact-icon.png" />
        </div>

        <div className="relative pt-1">
          <DockIcon
            isClickable={false}
            icon="/vscode-icon.png"
            width={38}
            height={38}
            paddingBottom={-8}
          />
        </div>

        <div className="relative">
          <DockIcon isClickable={false} icon="/figma-icon.png" />
        </div>

        <div className="relative">
          <DockIcon isClickable={false} icon="/notion-icon.png" />
        </div>

        <div className="relative">
          <DockIcon isClickable={false} icon="/arc-icon.png" />
        </div>

        <div className="relative">
          <DockIcon isClickable={false} icon="/discord-icon.png" />
        </div>

        <div className="relative">
          <DockIcon isClickable={false} icon="/photos-icon.png" />
        </div>

        <div
          className="relative"
          onClick={(e) => {
            e.stopPropagation();
            onTrashClick?.();
          }}
        >
          <DockIcon isClickable={true} icon="/trash-icon.png" />
        </div>
      </div>
    </div>
  );
}
