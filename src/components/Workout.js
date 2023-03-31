import React, { useContext, useEffect, useState } from 'react';
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

const Workout = ({ onClose, onEndWorkout }) => {
  const { elapsedTime, setElapsedTime } = useContext(WorkoutContext);
  const [timerId, setTimerId] = useState(null);

  useEffect(() => {
    let intervalId;
  
    if (timerId === null) {
      const startTime = Date.now() - elapsedTime;
      intervalId = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1000);
      setTimerId(intervalId);
    }
  
    return () => {
      clearInterval(timerId);
      setTimerId(null);
    };
  }, [elapsedTime, timerId, setElapsedTime]);

  const handleMinimize = () => {
    onClose();
  };

  const handleEndWorkout = () => {
    onEndWorkout();
  };

  return (
    <StyledSwipeableDrawer anchor="bottom" open={true} onClose={handleMinimize}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px' }}>
        <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>Workout Screen</div>
        <div style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>{new Date(elapsedTime).toISOString().substr(11, 8)}</div>
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
