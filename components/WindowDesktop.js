"use client";

import { projectsData } from "@/data/projectsData";
import { getContent } from "@/data/contentData";
import Image from "next/image";
import { useState, useEffect } from "react";
import { LinkPreview } from "@/components/ui/link-preview";
import StickyNote from "@/components/StickyNote";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import dynamic from "next/dynamic";

const MermaidDiagram = dynamic(
  () => import("@/components/MermaidDiagram").then((mod) => mod.default),
  { ssr: false },
);

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
  isClosing = false,
}) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [enlargedProjectImage, setEnlargedProjectImage] = useState(null);
  const [isLearningNoteMinimized, setIsLearningNoteMinimized] = useState(false);
  const [learningNoteSize, setLearningNoteSize] = useState({
    width: 300,
    height: 500,
  });
  const [currentLearningIndex, setCurrentLearningIndex] = useState(0);
  const [currentScreenshotIndex, setCurrentScreenshotIndex] = useState(0);

  // State for bug sticky note (Portfolio project only)
  const [isBugNoteMinimized, setIsBugNoteMinimized] = useState(false);
  const [bugNoteSize, setBugNoteSize] = useState({
    width: 300,
    height: 450,
  });
  const [currentBugIndex, setCurrentBugIndex] = useState(0);

  // Auto-select first project when component mounts (only if no custom content is provided)
  useEffect(() => {
    if (projectsData.length > 0 && !selectedProject && !content) {
      setSelectedProject(projectsData[0]);
    }
  }, [content]);

  // Reset bug carousel when project changes.
  useEffect(() => {
    setCurrentBugIndex(0);
    setCurrentLearningIndex(0);
    setCurrentScreenshotIndex(0);
    setEnlargedProjectImage(null);
  }, [selectedProject?.id]);

  useEffect(() => {
    if (!enlargedProjectImage) return;
    const onEscape = (e) => {
      if (e.key === "Escape") setEnlargedProjectImage(null);
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [enlargedProjectImage]);

  // Handle minimize for learning note
  const handleMinimizeLearningNote = () => {
    setIsLearningNoteMinimized(!isLearningNoteMinimized);
  };

  // Handle update for learning note (resize, etc.)
  const handleLearningNoteUpdate = (updateData) => {
    if (updateData.size) {
      setLearningNoteSize(updateData.size);
    }
  };

  // Handle minimize for bug note (Portfolio project only)
  const handleMinimizeBugNote = () => {
    setIsBugNoteMinimized(!isBugNoteMinimized);
  };

  // Handle update for bug note (resize, etc.)
  const handleBugNoteUpdate = (updateData) => {
    if (updateData.size) {
      setBugNoteSize(updateData.size);
    }
  };

  // Function to render project details
  const renderProjectDetails = (project) => {
    const learningEntriesRaw =
      project.learningNotes && project.learningNotes.length > 0
        ? project.learningNotes
        : [
            {
              challenge: project.challenge,
              solution: project.solution,
              learning: project.learning,
            },
          ];
    const learningEntries = learningEntriesRaw.map((entry) =>
      typeof entry === "string"
        ? {
            challenge: project.challenge,
            solution: project.solution,
            learning: entry,
          }
        : entry,
    );
    const hasMultipleLearnedEntries = learningEntries.length > 1;
    const safeLearningIndex = Math.min(
      currentLearningIndex,
      Math.max(learningEntries.length - 1, 0),
    );
    const activeLearning = learningEntries[safeLearningIndex];

    const bugEntries =
      project.biggestBugs && project.biggestBugs.length > 0
        ? project.biggestBugs
        : project.biggestBug
          ? [project.biggestBug]
          : [];
    const hasMultipleBugs = bugEntries.length > 1;
    const safeBugIndex = Math.min(
      currentBugIndex,
      Math.max(bugEntries.length - 1, 0),
    );
    const activeBug = bugEntries[safeBugIndex];
    const screenshots =
      Array.isArray(project.screenshots) && project.screenshots.length > 0
        ? project.screenshots
        : project.screenshot
          ? [project.screenshot]
          : [];
    const hasMultipleScreenshots = screenshots.length > 1;
    const safeScreenshotIndex = Math.min(
      currentScreenshotIndex,
      Math.max(screenshots.length - 1, 0),
    );
    const activeScreenshot = screenshots[safeScreenshotIndex] || null;
    const activeScreenshotPosition =
      (project.screenshotPositions && activeScreenshot
        ? project.screenshotPositions[activeScreenshot]
        : null) || (project.title === "Obliq.chat" ? "center" : "top");

    return (
      <div className="space-y-6">
        {/* Project Screenshot - Enhanced */}
        <div
          className="relative rounded-2xl overflow-hidden bg-[#2c2c2e] h-[20.5rem] w-full group cursor-pointer shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-[1.02]"
          onClick={() => {
            if (!activeScreenshot) return;
            setEnlargedProjectImage({
              title: project.title,
              screenshots,
              index: safeScreenshotIndex,
            });
          }}
        >
          {activeScreenshot ? (
            <>
              {/* Actual Screenshot Image with Enhanced Effects */}
              <Image
                src={activeScreenshot}
                alt={`${project.title} screenshot ${safeScreenshotIndex + 1}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                style={{
                  objectPosition: activeScreenshotPosition,
                  objectFit: "cover",
                }}
                priority
              />

              {hasMultipleScreenshots && (
                <>
                  <div className="absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between px-3 pointer-events-none">
                    <button
                      type="button"
                      className="pointer-events-auto h-8 w-8 rounded-full bg-black/45 text-white text-lg leading-none transition-colors hover:bg-black/65"
                      aria-label="Previous screenshot"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentScreenshotIndex((prev) =>
                          prev <= 0 ? screenshots.length - 1 : prev - 1,
                        );
                      }}
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      className="pointer-events-auto h-8 w-8 rounded-full bg-black/45 text-white text-lg leading-none transition-colors hover:bg-black/65"
                      aria-label="Next screenshot"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentScreenshotIndex((prev) =>
                          prev >= screenshots.length - 1 ? 0 : prev + 1,
                        );
                      }}
                    >
                      ›
                    </button>
                  </div>
                  <div className="absolute bottom-3 left-1/2 z-20 -translate-x-1/2 flex items-center gap-1.5">
                    {screenshots.map((shot, index) => (
                      <button
                        key={`${shot}-${index}`}
                        type="button"
                        className={`h-1.5 rounded-full transition-all ${
                          index === safeScreenshotIndex
                            ? "w-5 bg-white/90"
                            : "w-1.5 bg-white/45 hover:bg-white/70"
                        }`}
                        aria-label={`Go to screenshot ${index + 1}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentScreenshotIndex(index);
                        }}
                      />
                    ))}
                  </div>
                </>
              )}

              {/* Subtle overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30"></div>

              {/* Right-Justified Title Overlay */}
              <div className="absolute inset-0 flex flex-col items-end justify-end z-10 p-6">
                <div className="text-right space-y-3">
                  <h3
                    className={`text-5xl font-black leading-tight tracking-tight drop-shadow-lg ${
                      project.title === "InterVue" ||
                      project.title === "Obliq.chat"
                        ? "text-white drop-shadow-2xl"
                        : "text-gray-900"
                    }`}
                  >
                    {project.title}
                  </h3>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Fallback - Right-Justified Title Overlay */}
              <div className="absolute inset-0 flex flex-col items-end justify-end z-10 p-6">
                <div className="text-right space-y-3">
                  <h3
                    className={`text-5xl font-black leading-tight tracking-tight drop-shadow-lg ${
                      project.title === "InterVue" ||
                      project.title === "Obliq.chat"
                        ? "text-white drop-shadow-2xl"
                        : "text-gray-900"
                    }`}
                  >
                    {project.title}
                  </h3>
                </div>
              </div>

              {/* Enhanced background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#2c2c2e] to-[#1a1a1a] opacity-90"></div>
            </>
          )}
          {/* Fallback text for accessibility */}
          <span className="sr-only">Screenshot for {project.title}</span>
        </div>

        {/* Project Description */}
        <p className="text-[#8e8e93] text-base leading-relaxed mt-6">
          {project.description}
        </p>

        {/* Tech Stack + Key Features + What I Learned - Three Column Layout */}
        <div className="grid grid-cols-3 gap-6">
          {/* Tech Stack Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#e5e5ea]">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies?.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-[#2997FF] text-white rounded-full text-sm"
                >
                  {tech}
                </span>
              )) || (
                <span className="text-[#8e8e93]">No technologies listed</span>
              )}
            </div>
          </div>
          {/* Key Features */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#e5e5ea]">
              Key Features
            </h3>
            <div className="space-y-2">
              {project.features?.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm text-[#d1d1d6]"
                >
                  <span className="w-2 h-2 bg-[#2997FF] rounded-full flex-shrink-0"></span>
                  <span>{feature}</span>
                </div>
              )) || <span className="text-[#8e8e93]">No features listed</span>}
            </div>
          </div>

          {/* What I Learned - StickyNote Component */}
          <div className="relative">
            <StickyNote
              id="project-learning-note"
              title="📝 What I Learned"
              content={`• Challenge:
${activeLearning?.challenge || ""}

• Solution:
${activeLearning?.solution || ""}

• Key Learning:
${activeLearning?.learning || ""}`}
              position={{ top: 0, left: 0 }}
              size={learningNoteSize}
              bgColor="#FFE066"
              textColor="#333333"
              isEditable={false}
              type="permanent"
              contentFontWeight="font-medium"
              contentStyleVariant="bug-sections"
              isMinimized={isLearningNoteMinimized}
              onMinimize={handleMinimizeLearningNote}
              onUpdate={handleLearningNoteUpdate}
              headerActions={
                hasMultipleLearnedEntries ? (
                  <>
                    <button
                      type="button"
                      className="h-5 w-5 rounded-full bg-black/10 text-xs font-semibold text-gray-700 transition-colors hover:bg-black/20"
                      aria-label="Previous learning note"
                      onMouseDown={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentLearningIndex((prev) =>
                          prev <= 0 ? learningEntries.length - 1 : prev - 1,
                        );
                      }}
                    >
                      {"<"}
                    </button>
                    <button
                      type="button"
                      className="h-5 w-5 rounded-full bg-black/10 text-xs font-semibold text-gray-700 transition-colors hover:bg-black/20"
                      aria-label="Next learning note"
                      onMouseDown={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentLearningIndex((prev) =>
                          prev >= learningEntries.length - 1 ? 0 : prev + 1,
                        );
                      }}
                    >
                      {">"}
                    </button>
                  </>
                ) : null
              }
            />
          </div>
        </div>

        {/* Performance Metrics + Project Highlights - Side by Side */}
        <div className="grid grid-cols-3 gap-6">
          {/* Biggest Bug sticky note OR Performance Metrics */}
          {activeBug ? (
            <div
              className="relative col-span-1"
              style={{
                minHeight: isBugNoteMinimized
                  ? 56
                  : (bugNoteSize?.height || 450) + 24,
              }}
            >
              <StickyNote
                id={`project-bug-note-${project.id}`}
                title={
                  hasMultipleBugs
                    ? "🐛 Biggest Bugs I faced"
                    : "🐛 Biggest Bug I faced"
                }
                content={`• The Challenge:
${activeBug.challenge}

• The Problem:
${activeBug.problem}

• The Solution:
${activeBug.solution}

• Key Learning:
${activeBug.learning}`}
                position={{ top: 0, left: 0 }}
                size={bugNoteSize}
                bgColor={activeBug.bgColor || "#6B7280"}
                textColor="#FFFFFF"
                isEditable={false}
                type="permanent"
                contentFontWeight="font-medium"
                contentStyleVariant="bug-sections"
                isMinimized={isBugNoteMinimized}
                onMinimize={handleMinimizeBugNote}
                onUpdate={handleBugNoteUpdate}
                headerActions={
                  hasMultipleBugs ? (
                    <>
                      <button
                        type="button"
                        className="h-5 w-5 rounded-full bg-black/10 text-xs font-semibold text-gray-700 transition-colors hover:bg-black/20"
                        aria-label="Previous bug"
                        onMouseDown={(e) => e.stopPropagation()}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentBugIndex((prev) =>
                            prev <= 0 ? bugEntries.length - 1 : prev - 1,
                          );
                        }}
                      >
                        {"<"}
                      </button>
                      <button
                        type="button"
                        className="h-5 w-5 rounded-full bg-black/10 text-xs font-semibold text-gray-700 transition-colors hover:bg-black/20"
                        aria-label="Next bug"
                        onMouseDown={(e) => e.stopPropagation()}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentBugIndex((prev) =>
                            prev >= bugEntries.length - 1 ? 0 : prev + 1,
                          );
                        }}
                      >
                        {">"}
                      </button>
                    </>
                  ) : null
                }
              />
            </div>
          ) : (
            project.metrics && (
              <div className="space-y-4 col-span-1 mt-0">
                <h3 className="text-lg font-semibold text-[#e5e5ea]">
                  Performance Metrics
                </h3>
                <div className="space-y-3">
                  {Object.entries(project.metrics).map(
                    ([key, value], index) => (
                      <div key={index} className="bg-[#2c2c2e] rounded-lg p-3">
                        <div className="text-xs text-[#8e8e93] uppercase tracking-wide">
                          {key}
                        </div>
                        <div className="text-sm font-semibold text-[#f2f2f7]">
                          {value}
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            )
          )}

          {/* Project Highlights */}
          {project.highlights && (
            <div className="space-y-4 col-span-2 mt-10">
              <h3 className="text-lg font-semibold text-[#e5e5ea]">
                Project Highlights
              </h3>
              <div className="space-y-2">
                {project.highlights?.map((highlight, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-sm text-[#d1d1d6]"
                  >
                    <span className="w-1.5 h-1.5 bg-[#2997FF] rounded-full flex-shrink-0"></span>
                    <span>{highlight}</span>
                  </div>
                )) || (
                  <span className="text-[#8e8e93]">No highlights listed</span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Codebase Indexing Pipeline - Full width, below everything (Mach only) */}
        {project.diagrams && project.diagrams.length > 0 && (
          <div
            className={`pt-8 border-t border-[#2c2c2e] ${
              project.id === 4 ? "mt-44" : "mt-16"
            }`}
          >
            {project.diagrams.map((diagram) => (
              <MermaidDiagram
                key={diagram.id}
                id={diagram.id}
                title={diagram.title}
                code={diagram.code}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div
        className={`fixed rounded-3xl flex justify-between bg-transparent select-none border-1 border-black/6 transition-all duration-200 ease-in-out z-[10000] ${
          isClosing ? "opacity-0 scale-95" : "opacity-100 scale-100"
        }`}
        style={{
          top: position.top,
          left: position.left,
          width: width || 800,
          height: height || 600,
          zIndex: style?.zIndex || 9998,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sidebar - only show when no custom content is provided */}
        {!content && (
          <div className="w-fit min-w-48 h-full rounded-l-3xl px-2 flex flex-col justify-start bg-[#1c1c1e] border-r border-[#2c2c2e]">
            <div className="flex h-10 rounded-tl-3xl p-3 gap-2 items-center">
              <div
                className="relative group cursor-pointer w-[12px] h-[12px]"
                onClick={onClose}
                title="Close"
              >
                <Image
                  src="/close-icon.svg"
                  alt="Close"
                  width={12}
                  height={12}
                />
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

            <div className="flex flex-col rounded-bl-3xl justify-between">
              <div className=" w-full flex flex-col pt-6 gap-3">
                <div className="text-[11px] tracking-wide pl-4 uppercase text-[#8e8e93]">
                  Projects
                </div>

                <div className="flex flex-col gap-2">
                  {projectsData.map(({ id, title, icon, bio }) => (
                    <button
                      key={id}
                      className={`flex items-center gap-2 pl-4 py-1 rounded-md hover:bg-[#2c2c2e]/70 focus:bg-[#2c2c2e] text-left transition-colors ${
                        selectedProject?.id === id ? "bg-[#2c2c2e]" : ""
                      }`}
                      onClick={() =>
                        setSelectedProject(
                          projectsData.find((p) => p.id === id),
                        )
                      }
                    >
                      <Image
                        className="inline-block opacity-90"
                        src={icon}
                        alt={`${title} icon`}
                        width={18}
                        height={18}
                      />
                      <span
                        className={`text-[13px] ${
                          title === "InterVue"
                            ? "text-white font-medium"
                            : "text-[#e5e5ea]"
                        }`}
                      >
                        {title}
                      </span>
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
        )}

        {/* Right pane */}
        <div
          className={`flex flex-col w-full justify-between items-center ${content ? "rounded-3xl" : ""}`}
        >
          {/* Toolbar/Header */}
          <div
            className={`w-full h-16 p-0 m-0 pt-4 pr-4 bg-[#2c2c2e] border-b border-[#2c2c2e] flex items-center justify-between ${content ? "rounded-t-3xl pl-3" : "rounded-tr-3xl pl-10"}`}
          >
            {/* Window controls for custom content windows (when sidebar is hidden) */}
            {content && (
              <div className="flex items-center">
                <div
                  className="relative group cursor-pointer w-[12px] h-[12px] mr-4"
                  onClick={onClose}
                  title="Close"
                >
                  <Image
                    src="/close-icon.svg"
                    alt="Close"
                    width={12}
                    height={12}
                  />
                  <Image
                    src="/cross-icon.svg"
                    alt="Close overlay"
                    width={6}
                    height={6}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-60 transition-opacity pointer-events-none"
                  />
                </div>
              </div>
            )}

            <div className="flex-1">
              <div
                className={`text-[18px] font-bold ${
                  (selectedProject && selectedProject.title === "InterVue") ||
                  title === "InterVue"
                    ? "text-white"
                    : "text-[#f2f2f7]"
                }`}
              >
                {selectedProject ? selectedProject.title : title}
              </div>
              <div className="text-[12px] text-[rgb(102,238,229)]">
                {selectedProject ? selectedProject.bio : bio}
              </div>
            </div>

            {/* Action Links */}
            {selectedProject && (
              <div className="flex gap-2">
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-3 py-1 bg-[#363636] rounded text-xs hover:bg-[#4a4a4a] transition-colors"
                >
                  <Image
                    src="/github-icon.svg"
                    width={16}
                    height={16}
                    alt="GitHub"
                  />
                  <span>Code</span>
                </a>
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-3 py-1 bg-[#2997FF] rounded text-xs hover:bg-[#1a7ae6] transition-colors"
                >
                  <span>Demo</span>
                </a>
              </div>
            )}
          </div>

          {/* Content area */}
          <ScrollArea
            className={`w-full h-full bg-[#363636] text-[#d1d1d6] ${content ? "rounded-b-3xl" : "rounded-br-3xl"}`}
            viewportClassName="px-6 pt-6 pb-12"
          >
            {selectedProject ? (
              // Show project details when a project is selected
              renderProjectDetails(selectedProject)
            ) : (
              // Show default content when no project is selected
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
                        </LinkPreview>
                      </div>
                    ))
                  : // Default content for other windows
                    getContent(desktopItem.id, selectedProject?.id).map(
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
                      ),
                    )}
              </div>
            )}
            <ScrollBar
              orientation="vertical"
              className="w-2.5 bg-transparent"
              thumbClassName="bg-white/35 hover:bg-white/55"
            />
          </ScrollArea>
        </div>
      </div>

      {enlargedProjectImage && (
        <div
          className="fixed inset-0 z-[12000] flex items-center justify-center bg-black/75 p-6"
          onClick={(e) => {
            e.stopPropagation();
            setEnlargedProjectImage(null);
          }}
        >
          <div
            className="relative h-[min(82vh,760px)] w-[min(92vw,1240px)] overflow-hidden rounded-[1.4rem] bg-transparent"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={enlargedProjectImage.screenshots[enlargedProjectImage.index]}
              alt={`${enlargedProjectImage.title} screenshot`}
              fill
              className="object-contain"
              sizes="92vw"
              priority
            />
            {enlargedProjectImage.screenshots.length > 1 && (
              <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-10 flex items-center justify-between px-3">
                <button
                  type="button"
                  className="pointer-events-auto h-9 w-9 rounded-full bg-[#ADADA8]/90 text-[#1f1f1f] text-xl leading-none hover:bg-[#ADADA8]"
                  aria-label="Previous enlarged screenshot"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEnlargedProjectImage((prev) => {
                      const nextIndex =
                        prev.index <= 0
                          ? prev.screenshots.length - 1
                          : prev.index - 1;
                      setCurrentScreenshotIndex(nextIndex);
                      return { ...prev, index: nextIndex };
                    });
                  }}
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="pointer-events-auto h-9 w-9 rounded-full bg-[#ADADA8]/90 text-[#1f1f1f] text-xl leading-none hover:bg-[#ADADA8]"
                  aria-label="Next enlarged screenshot"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEnlargedProjectImage((prev) => {
                      const nextIndex =
                        prev.index >= prev.screenshots.length - 1
                          ? 0
                          : prev.index + 1;
                      setCurrentScreenshotIndex(nextIndex);
                      return { ...prev, index: nextIndex };
                    });
                  }}
                >
                  ›
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
