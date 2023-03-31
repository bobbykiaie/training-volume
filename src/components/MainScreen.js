import React from 'react';
import { Button } from '@mui/material';

const MainScreen = ({ onWorkoutOpen }) => {
  const handleClick = () => {
    onWorkoutOpen();
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ borderRadius: 3, position: 'absolute', bottom: 70, left: 16, right: 16 }}
        onClick={handleClick}
      >
        Start an empty workout
      </Button>
    </div>
  );
};

export default MainScreen;
