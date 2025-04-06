import React, { createContext, useState, useContext } from 'react';

const BookmarksContext = createContext();

export const useBookmarks = () => {
  return useContext(BookmarksContext);
};

export const BookmarksProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);

  const addBookmark = (station) => {
    setBookmarks((prevBookmarks) => [...prevBookmarks, station]);
  };

  const removeBookmark = (station) => {
    setBookmarks((prevBookmarks) =>
      prevBookmarks.filter((item) => item.id !== station.id)
    );
  };

  return (
    <BookmarksContext.Provider value={{ bookmarks, addBookmark, removeBookmark }}>
      {children}
    </BookmarksContext.Provider>
  );
};

