import React, { useState } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import Workout from './Workout';
import MainScreen from './MainScreen';
import ChartScreen from './ChartScreen';
import { styled } from '@mui/material/styles';
import WorkoutContext from '../context';

const StyledBottomNavigation = styled(BottomNavigation)({
  position: 'fixed',
  bottom: 0,
  width: '100%',
  zIndex: 950,
});

const BottomNavigationTabs = ({ addWorkoutTime }) => {
  const [value, setValue] = useState(0);
  const [workoutActive, setWorkoutActive] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  const handleWorkoutOpen = () => {
    setValue(2);
    setWorkoutActive(true);
  };

  const handleWorkoutClose = () => {
    setValue(0);
  };

  const EndWorkout = () => {
    setValue(0);
    setWorkoutActive(false);
    addWorkoutTime(elapsedTime); // Add workout time to chart
    setElapsedTime(0); // Reset elapsed time
  };

  const getCurrentTab = () => {
    switch (value) {
      case 0:
        return <MainScreen onWorkoutOpen={handleWorkoutOpen} />;
      case 1:
        return <ChartScreen />;
      case 2:
        return <Workout onClose={handleWorkoutClose} onEndWorkout={EndWorkout} />;
      default:
        return <MainScreen onWorkoutOpen={handleWorkoutOpen} />;
    }
  };

  return (
    <WorkoutContext.Provider value={{ elapsedTime, setElapsedTime }}>
      <div>
        {getCurrentTab()}
        <StyledBottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          showLabels
        >
          <BottomNavigationAction label="Home" icon={<HomeIcon />} />
          <BottomNavigationAction label="Chart" icon={<ShowChartIcon />} />
          {workoutActive && <BottomNavigationAction label="Workout" icon={<FitnessCenterIcon />} />}
        </StyledBottomNavigation>
      </div>
    </WorkoutContext.Provider>
  );
};

export default BottomNavigationTabs;
