"use client";

import { projectsData } from "@/data/projectsData";
import { getContent } from "@/data/contentData";
import Image from "next/image";
import { useState, useEffect } from "react";
import { LinkPreview } from "@/components/ui/link-preview";
import StickyNote from "@/components/StickyNote";

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
  const [isLearningNoteMinimized, setIsLearningNoteMinimized] = useState(false);
  const [learningNoteSize, setLearningNoteSize] = useState({
    width: 300,
    height: 500,
  });

  // Auto-select first project when component mounts
  useEffect(() => {
    if (projectsData.length > 0 && !selectedProject) {
      setSelectedProject(projectsData[0]);
    }
  }, []);

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

  // Function to render project details
  const renderProjectDetails = (project) => {
    return (
      <div className="space-y-6">
        {/* Project Screenshot - Enhanced */}
        <div className="relative rounded-xl overflow-hidden bg-[#2c2c2e] h-56 w-full group cursor-pointer shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-[1.02]">
          {project.screenshot ? (
            <>
              {/* Actual Screenshot Image with Enhanced Effects */}
              <Image
                src={project.screenshot}
                alt={`${project.title} screenshot`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                style={{ objectPosition: "top", objectFit: "cover" }}
                priority
              />

              {/* Subtle overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30"></div>

              {/* Right-Justified Title Overlay */}
              <div className="absolute inset-0 flex flex-col items-end justify-end z-10 p-6">
                <div className="text-right space-y-3">
                  <h3 className="text-5xl font-black text-gray-900 leading-tight tracking-tight drop-shadow-lg">
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
                  <h3 className="text-5xl font-black text-gray-900 leading-tight tracking-tight drop-shadow-lg">
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
${project.challenge}

• Solution:
${project.solution}

• Key Learning:
${project.learning}`}
              position={{ top: 0, left: 0 }}
              size={learningNoteSize}
              bgColor="#FFE066"
              textColor="#333333"
              isEditable={false}
              type="permanent"
              isMinimized={isLearningNoteMinimized}
              onMinimize={handleMinimizeLearningNote}
              onUpdate={handleLearningNoteUpdate}
            />
          </div>
        </div>

        {/* Performance Metrics + Project Highlights - Side by Side */}
        <div className="grid grid-cols-3 gap-6">
          {/* Performance Metrics */}
          {project.metrics && (
            <div className="space-y-4 col-span-1 mt-0">
              <h3 className="text-lg font-semibold text-[#e5e5ea]">
                Performance Metrics
              </h3>
              <div className="space-y-3">
                {Object.entries(project.metrics).map(([key, value], index) => (
                  <div key={index} className="bg-[#2c2c2e] rounded-lg p-3">
                    <div className="text-xs text-[#8e8e93] uppercase tracking-wide">
                      {key}
                    </div>
                    <div className="text-sm font-semibold text-[#f2f2f7]">
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
      </div>
    );
  };

  return (
    <div
      className={`fixed rounded-lg flex justify-between bg-transparent select-none border-1 border-black/6 transition-all duration-200 ease-in-out z-[10000] ${
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
      {/* Sidebar */}
      <div className="w-fit min-w-48 h-full rounded-l-lg px-2 flex flex-col justify-start bg-[#1c1c1e] border-r border-[#2c2c2e]">
        <div className="flex h-10 rounded-tl-lg p-3 gap-2 items-center">
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

        <div className="flex flex-col rounded-bl-lg justify-between">
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
                    setSelectedProject(projectsData.find((p) => p.id === id))
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
        <div className="w-full h-16 rounded-tr-lg p-0 m-0 pt-4 pl-10 pr-4 bg-[#2c2c2e] border-b border-[#2c2c2e] flex items-center justify-between">
          <div>
            <div className="text-[14px] font-medium text-[#f2f2f7]">
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
        <div className="w-full h-full rounded-br-lg p-6 bg-[#363636] text-[#d1d1d6] overflow-y-auto">
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
                    )
                  )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
