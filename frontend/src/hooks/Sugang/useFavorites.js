import { useState, useEffect } from "react";

const useFavorites = (userId) => {
  const [favorites, setFavorites] = useState([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const loadFavorites = (userId) => {
    if (!userId) return [];
    try {
      const stored = localStorage.getItem(`favorites_${userId}`);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.log("즐겨찾기 로드 실패");
      return [];
    }
  };

  const saveFavorites = (userId, favoritesData) => {
    if (!userId) return;
    try {
      localStorage.setItem(
        `favorites_${userId}`,
        JSON.stringify(favoritesData)
      );
    } catch (error) {
      console.log("즐겨찾기 저장 실패");
    }
  };

  useEffect(() => {
    if (userId) {
      const userFavorites = loadFavorites(userId);
      setFavorites(userFavorites);
      setIsInitialLoad(false);
    } else {
      setFavorites([]);
      setIsInitialLoad(true);
    }
  }, [userId]);

  useEffect(() => {
    if (userId && !isInitialLoad) {
      saveFavorites(userId, favorites);
    }
  }, [favorites, userId, isInitialLoad]);

  const toggleFavorite = (courseId) => {
    if (!userId) return;

    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(courseId)) {
        return prevFavorites.filter((id) => id !== courseId);
      } else {
        return [...prevFavorites, courseId];
      }
    });
  };

  const isFavorite = (courseId) => {
    return favorites.includes(courseId);
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite,
  };
};

export default useFavorites;
