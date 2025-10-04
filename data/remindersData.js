// Static reminder data for the decorative Reminders component
// These todos give visitors insight into the developer's daily routine

export const remindersData = [
  {
    id: 1,
    text: "Update portfolio",
    completed: false,
    category: "today",
    priority: "high",
  },
  {
    id: 2,
    text: "Leetcode 1hr",
    completed: false,
    category: "today",
    priority: "normal",
  },
  {
    id: 3,
    text: "Read tech articles",
    completed: false,
    category: "scheduled",
    priority: "normal",
  },
  {
    id: 4,
    text: "Research internships 1hr",
    completed: false,
    category: "scheduled",
    priority: "high",
  },
  {
    id: 5,
    text: "Fix bug in the bento div bottom left",
    completed: true,
    category: "today",
    priority: "high",
  },
  {
    id: 6,
    text: "update README.md",
    completed: false,
    category: "scheduled",
    priority: "normal",
  },
  {
    id: 7,
    text: "Begin CSE380 project 1",
    completed: false,
    category: "today",
    priority: "high",
  },
  {
    id: 8,
    text: "Deploy to production",
    completed: false,
    category: "scheduled",
    priority: "high",
  },
];

// Helper function to get all reminders (for consistency with other data files)
export const getAllReminders = () => {
  return remindersData;
};

// Helper function to get completed reminders
export const getCompletedReminders = () => {
  return remindersData.filter((reminder) => reminder.completed);
};

// Helper function to get pending reminders
export const getPendingReminders = () => {
  return remindersData.filter((reminder) => !reminder.completed);
};

// Helper function to get today's reminders count
export const getTodayCount = () => {
  return remindersData.filter((reminder) => reminder.category === "today")
    .length;
};

// Helper function to get scheduled reminders count
export const getScheduledCount = () => {
  return remindersData.filter((reminder) => reminder.category === "scheduled")
    .length;
};

// Helper function to get completed reminders count
export const getCompletedCount = () => {
  return remindersData.filter((reminder) => reminder.completed).length;
};
