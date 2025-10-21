export const stickyNotesData = [
  {
    id: "sticky-note-1",
    title: "Welcome!",
    content:
      "This is a sticky note! Click to edit, drag to move around. You can create more notes in the data file.",
    position: { top: 50, left: 80 },
    size: { width: 250, height: 180 },
    bgColor: "#FFE066",
    textColor: "#333333",
    isEditable: true,
    type: "permanent",
    author: null,
    status: "approved",
    createdAt: "2024-01-01T00:00:00.000Z",
    whitespace: "preline",
  },
  {
    id: "sticky-note-2",
    title: "Todo List",
    content: [
      "• Fix portfolio animations",
      "• Add more projects",
      "• Update resume",
      "• Neetcode 75",
      "• Workout",
      "• Springboot (1hr) ",
      "• APPLY!!!",
    ].join("\n"),
    position: { top: 100, left: 450 },
    size: { width: 220, height: 250 },
    bgColor: "#FF6B6B",
    textColor: "#FFFFFF",
    isEditable: true,
    type: "permanent",
    author: null,
    status: "approved",
    createdAt: "2024-01-01T00:00:00.000Z",
    whitespace: "pre-line",
  },
  {
    id: "sticky-note-3",
    title: "Ideas",
    content:
      "• Dark mode toggle\n• Custom themes\n• Note categories\n• Export notes",
    position: { top: 500, left: 450 },
    size: { width: 200, height: 150 },
    bgColor: "#4ECDC4",
    textColor: "#FFFFFF",
    isEditable: true,
    type: "permanent",
    author: null,
    status: "approved",
    createdAt: "2024-01-01T00:00:00.000Z",
  },
];

// Helper function to add a new sticky note
export const addStickyNote = (notes, newNote) => {
  const defaultNote = {
    id: `sticky-note-${Date.now()}`,
    title: "{Name/Anonymous}",
    content: "Click to edit...",
    position: { top: 100, left: 100 },
    size: { width: 250, height: 180 },
    bgColor: "#FFE066",
    textColor: "#333333",
    isEditable: true,
    type: "permanent",
    author: null,
    status: "approved",
    createdAt: new Date().toISOString(),
  };

  return [...notes, { ...defaultNote, ...newNote }];
};

// Helper function to get approved notes (for display)
export const getApprovedNotes = (notes) => {
  // For now, return all notes regardless of status
  return notes;
};

// Helper function to get pending notes (for admin review)
export const getPendingNotes = (notes) => {
  return notes.filter((note) => note.status === "pending");
};

// Helper function to approve a note
export const approveNote = (notes, noteId) => {
  return notes.map((note) =>
    note.id === noteId ? { ...note, status: "approved" } : note
  );
};

// Helper function to reject a note
export const rejectNote = (notes, noteId) => {
  return notes.filter((note) => note.id !== noteId);
};

// Helper function to update a sticky note
export const updateStickyNote = (notes, noteId, updates) => {
  return notes.map((note) =>
    note.id === noteId ? { ...note, ...updates } : note
  );
};

// Helper function to delete a sticky note
export const deleteStickyNote = (notes, noteId) => {
  return notes.filter((note) => note.id !== noteId);
};
