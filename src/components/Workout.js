import React, { useContext, useEffect, useRef, useState } from 'react';
import { SwipeableDrawer } from '@mui/material';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import WorkoutContext from '../context';

const StyledSwipeableDrawer = styled(SwipeableDrawer)({
  '& .MuiDrawer-paper': {
    height: 'calc(100% - 56px)',
    top: 56,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
});

const Workout = ({ onClose, onEndWorkout, workout = { name: 'None', exercises: [] } }) => {
  const { elapsedTime, setElapsedTime } = useContext(WorkoutContext);
  const startTimeRef = useRef(Date.now());

const handleScone = () =>{
  console.log(workout)
}
  useEffect(() => {
    const intervalId = setInterval(() => {

      setElapsedTime(Date.now() - startTimeRef.current);
    }, 1000);
    
    return () => {
      clearInterval(intervalId);
    };
  }, [setElapsedTime]);

  const handleMinimize = () => {
    onClose();
  };

  const handleEndWorkout = () => {
    onEndWorkout();
    setElapsedTime(0); // Reset elapsed time to zero after ending the workout
    startTimeRef.current = Date.now(); // Update the start time for the next workout
  };

  const formatTime = (time) => {
    const date = new Date(time);
    return date.toISOString().substr(11, 8);
  };

  return (
    <StyledSwipeableDrawer anchor="bottom" open={true} onClose={handleMinimize}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px' }}>
        <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>{workout.name}</div>
        {workout.exercises.map((exercise, index) => (
  <div key={index} style={{ fontSize: '16px', marginBottom: '8px' }}>
    {exercise.name.name} - {exercise.name.primary_muscle}
  </div>
))}
      
        <div style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>{formatTime(elapsedTime)}</div>
        <Button variant="contained" color="primary" onClick={handleEndWorkout} style={{ marginBottom: '16px' }}>
          End Workout
        </Button>
        <Button variant="outlined" color="primary" onClick={handleMinimize}>
          Minimize
        </Button>
      </div>
    </StyledSwipeableDrawer>
  );
};

export default Workout;