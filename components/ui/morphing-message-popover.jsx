"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export function MorphingMessagePopover() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement message sending functionality
    console.log("Message data:", formData);

    // Reset form
    setFormData({ name: "", email: "", message: "" });
    setIsOpen(false);
  };

  return (
    <div className="relative z-50">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.button
            key="trigger"
            onClick={() => setIsOpen(true)}
            className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white text-xs font-medium rounded-lg transition-colors duration-200 border border-gray-600 cursor-pointer"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
          >
            Send a message
          </motion.button>
        ) : (
          <motion.div
            key="content"
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full bg-zinc-700 border border-gray-700 rounded-xl p-3 w-64 shadow-2xl z-50"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", bounce: 0.1, duration: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Name Input */}
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full pl-1 pr-3 py-2 bg-transparent text-zinc-400 placeholder-zinc-400 focus:outline-none text-sm rounded"
                placeholder="Your name"
                required
              />

              {/* Email Input */}
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full pl-1 pr-3 py-2 bg-transparent text-zinc-400 placeholder-zinc-400 focus:outline-none text-sm rounded"
                placeholder="your.email@example.com"
                required
              />

              {/* Message Textarea */}
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                rows={4}
                className="w-full pl-1 pr-3 py-2 bg-transparent text-zinc-400 placeholder-zinc-400 focus:outline-none resize-none text-sm rounded"
                placeholder="What would you like to say?"
                required
              />

              {/* Submit Button */}
              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-white hover:text-gray-300 transition-colors duration-200"
                >
                  ←
                </button>
                <button
                  type="submit"
                  className="px-2 bg-transparent text-white text-xs font-medium rounded-lg transition-colors duration-200 hover:text-gray-300  "
                >
                  Submit
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
