import React from 'react';

const WorkoutContext = React.createContext({
  elapsedTime: 0,
  setElapsedTime: () => {},
});

export default WorkoutContext;
