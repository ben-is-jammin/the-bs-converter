import React, { createContext, useReducer } from 'react';
import appReducer from './appReducer';

export const HistoryContext = createContext();

const HistoryProvider = ({ children }) => {
  const [history, dispatch] = useReducer(appReducer, []);

  return (
    <HistoryContext.Provider value={{ history, dispatch }}>
      {children}
    </HistoryContext.Provider>
  );
};

export default HistoryProvider;
