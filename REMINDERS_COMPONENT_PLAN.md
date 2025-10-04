# Reminders Component - Implementation Plan

## Overview

A decorative macOS-style reminders component for the portfolio desktop. This component displays a static list of daily todos to give visitors insight into the developer's routine and work habits.

## Design Philosophy

- **Pure Decoration**: No user interaction, just visual appeal
- **macOS Native Feel**: Matches the official macOS Reminders app aesthetic
- **Portfolio Context**: Shows personality without being distracting
- **Simplicity**: Much simpler than sticky notes - no drag, resize, or editing

## Component Architecture

### 1. Data Structure

```javascript
// Static data - no state management needed
const remindersData = [
  { id: 1, text: "Review code changes", completed: true },
  { id: 2, text: "Update portfolio", completed: false },
  { id: 3, text: "Practice algorithms", completed: false },
  { id: 4, text: "Call mom", completed: true },
  { id: 5, text: "Read tech articles", completed: false },
  { id: 6, text: "Plan next project", completed: false },
];
```

### 2. Component Structure

```
RemindersWindow
├── Header
│   ├── Window Controls (red, yellow buttons)
│   └── Title ("Reminders")
├── Content Area
│   ├── ReminderItem (checkbox + text)
│   ├── ReminderItem
│   └── ...
└── Footer (optional "Add Reminder" button - decorative only)
```

### 3. Visual Design

- **Window**: macOS-style with rounded corners
- **Background**: Dark gray (#2C2C2E or similar)
- **Text**: White/light gray for contrast
- **Checkboxes**: Circular, filled when completed
- **Typography**: Clean, modern sans-serif
- **Spacing**: Generous padding, clean separation

## Implementation Steps

### Phase 1: Data Layer

1. Create `data/remindersData.js` with sample todos
2. Define data structure and helper functions

### Phase 2: Component Development

1. Create `components/Reminders.js` component
2. Implement basic structure and styling
3. Add macOS window controls
4. Style individual reminder items

### Phase 3: Integration

1. Add Reminders component to `Desktop.js`
2. Position appropriately on desktop
3. Ensure proper z-index and layering

### Phase 4: Polish

1. Refine styling to match macOS aesthetic
2. Add subtle animations/transitions
3. Ensure responsive design
4. Test across different screen sizes

## Technical Specifications

### Props (if needed)

```javascript
{
  position: { top: number, left: number },
  isMinimized: boolean,
  onMinimize: function
}
```

### Styling Approach

- **Tailwind CSS**: Use existing utility classes
- **Custom Colors**: Match macOS dark theme
- **Responsive**: Work on different screen sizes
- **Accessibility**: Proper contrast ratios

### Performance Considerations

- **Static Rendering**: No state updates needed
- **Minimal Re-renders**: Pure presentation component
- **Lightweight**: Simple DOM structure

## File Structure

```
data/
├── remindersData.js          # Static reminder data
components/
├── Reminders.js              # Main component
└── ReminderItem.js           # Individual reminder (if needed)
```

## Success Criteria

- [ ] Matches macOS Reminders app visual design
- [ ] Displays sample todos in checklist format
- [ ] Integrates seamlessly with desktop
- [ ] No user interaction required
- [ ] Clean, professional appearance
- [ ] Responsive and accessible

## Future Considerations

- Could be extended to show different todo lists
- Could add subtle animations for visual interest
- Could integrate with other portfolio elements
- Could show different todos based on time of day

## Dependencies

- React (existing)
- Tailwind CSS (existing)
- No additional libraries needed

## Estimated Complexity

- **Lines of Code**: ~100-150 total
- **Development Time**: 1-2 hours
- **Maintenance**: Minimal (static component)
