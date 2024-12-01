'use client';

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';

// 1. Utility function to create a context with a provider and consumer
function createCtx<T>(defaultValue: T) {
  const Context = createContext<
    { state: T; setState: Dispatch<SetStateAction<T>> } | undefined
  >(undefined);

  const useCtx = () => {
    const contextValue = useContext(Context);
    if (contextValue === undefined) {
      throw new Error('useCtx must be used within a Provider');
    }
    return contextValue;
  };

  const Provider = ({
    children,
    initialValue,
  }: {
    children: ReactNode;
    initialValue?: T;
  }) => {
    const [state, setState] = useState(initialValue ?? defaultValue);
    return (
      <Context.Provider value={{ state, setState }}>
        {children}
      </Context.Provider>
    );
  };

  return [Provider, useCtx] as const;
}

export default createCtx;
