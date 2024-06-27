import React, { useState } from 'react';

const Context = React.createContext({});

const Provider = ({ children }) => {
  const [state, setState] = useState({
    today: new Date(),
    startDate: null,
    endDate: null,
    startTime: null,
    endTime: null
  });

  const updateContext = (partialState) => {
    setState({ ...state, ...partialState });
  };

  return (
    <Context.Provider value={{ ...state, updateContext }}>
      {children}
    </Context.Provider>
  );
};

// Export the Context and Consumer
export { Context as Consumer, Context, Provider };

