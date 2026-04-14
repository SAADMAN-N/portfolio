import DockIcon from "./DockIcon";

export default function Dock({
  onDesktopClick,
  onFinderClick,
  onIMessageClick,
  onTrashClick,
}) {
  return (
    <div className="pointer-events-none fixed bottom-5 left-0 right-0 z-[9999] flex w-full justify-center">
      <div
        className="pointer-events-auto inline-flex max-w-[min(96vw,1280px)] select-none items-center gap-3 rounded-3xl border border-zinc-500/25 bg-zinc-500/[0.22] px-3 py-2 shadow-[0_16px_50px_rgba(0,0,0,0.12),0_4px_20px_rgba(0,0,0,0.06),inset_0_1px_0_0_rgba(255,255,255,0.4)] backdrop-blur-2xl backdrop-saturate-150 sm:px-4 sm:py-2.5 dark:border-zinc-600/40 dark:bg-zinc-800/50 dark:shadow-[0_16px_50px_rgba(0,0,0,0.45),inset_0_1px_0_0_rgba(255,255,255,0.08)]"
        onClick={onDesktopClick}
      >
        <div
          className="relative shrink-0"
          onClick={(e) => {
            e.stopPropagation();
            onFinderClick?.();
          }}
        >
          <DockIcon isClickable={true} icon="/finder-icon.png" />
        </div>

        <div className="relative shrink-0">
          <DockIcon compact isClickable={false} icon="/settings-icon.png" />
        </div>

        <div className="relative shrink-0">
          <DockIcon isClickable={false} icon="/launchpad-icon.png" />
        </div>

        <div className="relative shrink-0" onClick={(e) => e.stopPropagation()}>
          <DockIcon isClickable={true} icon="/notes-icon.png" />
        </div>

        <div
          className="relative shrink-0"
          onClick={(e) => {
            e.stopPropagation();
            onIMessageClick?.();
          }}
        >
          <DockIcon isClickable={true} icon="/messages-icon.png" />
        </div>

        <div className="relative shrink-0" onClick={(e) => e.stopPropagation()}>
          <DockIcon isClickable={false} icon="/facetime-icon.png" />
        </div>

        <div className="relative shrink-0">
          <DockIcon isClickable={false} icon="/contact-icon.png" />
        </div>

        <div className="relative shrink-0">
          <DockIcon compact isClickable={false} icon="/vscode-icon.png" />
        </div>

        <div className="relative shrink-0">
          <DockIcon isClickable={false} icon="/figma-icon.png" />
        </div>

        <div className="relative shrink-0">
          <DockIcon isClickable={false} icon="/notion-icon.png" />
        </div>

        <div className="relative shrink-0">
          <DockIcon isClickable={false} icon="/arc-icon.png" />
        </div>

        <div className="relative shrink-0">
          <DockIcon isClickable={false} icon="/discord-icon.png" />
        </div>

        <div className="relative shrink-0">
          <DockIcon isClickable={false} icon="/photos-icon.png" />
        </div>

        <div
          className="flex h-[46px] shrink-0 items-center justify-center"
          aria-hidden
        >
          <div className="h-9 w-px rounded-full bg-black/50 dark:bg-white/40" />
        </div>

        <div
          className="relative shrink-0"
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
