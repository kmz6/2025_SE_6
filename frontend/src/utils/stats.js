import { startOfWeek, endOfWeek } from "./date";

export const calculateWeeklySubmissionStats = (assignments, selectedDate) => {
  const start = startOfWeek(selectedDate);
  const end = endOfWeek(selectedDate);

  const weeklyAssignments = assignments.filter((a) => {
    const dueDate = new Date(a.end_date.slice(0, 10));
    return dueDate >= start && dueDate <= end;
  });

  const total = weeklyAssignments.length;
  const submitted = weeklyAssignments.filter((a) => a.submission_id).length;
  const percent = total === 0 ? 0 : Math.round((submitted / total) * 100);

  return { total, submitted, percent };
};
