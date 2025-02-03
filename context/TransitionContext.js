import React, { createContext } from 'react';
import { useState } from 'react';

export const TransitionContext = createContext({ completed: false, preloaderCompleted: false });

export const TransitionProvider = ({ children }) => {
  const [completed, setCompleted] = useState(false);
  const [preloaderCompleted, setPreloaderCompleted] = useState(false);

  const toggleCompleted = (value) => {
    setCompleted(value);
  };

  const togglePreloaderCompleted = (value) => {
    setPreloaderCompleted(value);
  };

  return (
    <TransitionContext.Provider
      value={{
        toggleCompleted,
        togglePreloaderCompleted,
        completed,
        preloaderCompleted
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
};

export default TransitionContext;
