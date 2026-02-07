"use client";
import { useState, useRef, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { useForm, ValidationError } from "@formspree/react";
export function MorphingMessagePopover() {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);
  const [state, handleSubmit] = useForm("xpwynkgy");

  // Update popover position when opening (useLayoutEffect to avoid flash)
  useLayoutEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top,
        left: rect.left + rect.width / 2,
      });
    }
  }, [isOpen]);

  // Close form after successful submission
  if (state.succeeded) {
    setTimeout(() => {
      setIsOpen(false);
    }, 2000); // Close after 2 seconds
  }

  const popoverContent = (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          key="content"
          className="fixed bg-zinc-700 border border-gray-700 rounded-xl p-3 w-64 shadow-2xl"
          style={{
            top: position.top - 8,
            left: position.left,
            transform: "translate(-50%, -100%)",
            zIndex: 9999,
          }}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: "spring", bounce: 0.1, duration: 0.4 }}
        >
          <form onSubmit={handleSubmit} className="space-y-1">
            {/* Name Input */}
            <input
              id="name"
              name="name"
              type="text"
              className="w-full pl-1 pr-3 py-1 bg-transparent text-zinc-400 placeholder-white focus:outline-none text-sm rounded"
              placeholder="Your name"
              required
            />
            <ValidationError prefix="Name" field="name" errors={state.errors} />

            {/* Email Input */}
            <input
              id="email"
              name="email"
              type="email"
              className="w-full pl-1 pr-3 py-1 bg-transparent text-zinc-400 placeholder-black-500 focus:outline-none text-sm rounded"
              placeholder="your.email@example.com"
              required
            />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />

            {/* Message Textarea */}
            <textarea
              id="message"
              name="message"
              rows={4}
              className="w-full pl-1 pr-3 py-5 bg-transparent text-white-100 placeholder-zinc-400 focus:outline-none resize-none text-sm rounded"
              placeholder="Hey Sharf, ..."
              required
            />
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />

            {/* Submit Button */}
            <div className="flex justify-between pt-2">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-1 py-2 text-white hover:text-gray-300 transition-colors duration-200"
              >
                ←
              </button>
              <button
                type="submit"
                disabled={state.submitting}
                className="px-2 bg-transparent text-white text-xs font-medium rounded-lg transition-colors duration-200 hover:text-gray-300 disabled:opacity-50"
              >
                {state.submitting
                  ? "Sending..."
                  : state.succeeded
                    ? "Sent! ✓"
                    : "Submit"}
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <motion.button
        ref={triggerRef}
        onClick={() => setIsOpen(true)}
        className="px-3 py-1 h-fit bg-gray-700 hover:bg-gray-600 text-white text-xs font-medium rounded-lg transition-colors duration-200 border border-gray-600 cursor-pointer"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
      >
        Send a message
      </motion.button>
      {typeof document !== "undefined" &&
        createPortal(popoverContent, document.body)}
    </>
  );
}
