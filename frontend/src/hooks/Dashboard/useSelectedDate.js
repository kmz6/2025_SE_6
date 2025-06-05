import { useState, useEffect } from "react";

function useSelectedDate(user) {
  const [selectedDate, setSelectedDate] = useState(() => {
    if (!user) return new Date();
    const savedDate = localStorage.getItem(
      `dashboard_selectedDate_${user.user_id}`
    );
    if (savedDate) {
      try {
        return new Date(savedDate);
      } catch {
        return new Date();
      }
    }
    return new Date();
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(
        `dashboard_selectedDate_${user.user_id}`,
        selectedDate.toISOString()
      );
    }
  }, [selectedDate, user]);

  useEffect(() => {
    if (!user) {
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("dashboard_selectedDate_")) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach((key) => localStorage.removeItem(key));
      setSelectedDate(new Date());
    }
  }, [user]);

  return [selectedDate, setSelectedDate];
}

export default useSelectedDate;
