// WorkoutCard.js
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const WorkoutCard = ({ workout }) => {
  return (
    <Card sx={{ minWidth: 'calc(50% - 8px)', marginBottom: '16px' }}>
      <CardContent>
        <Typography variant="h6" component="h4">
          {workout.name}
        </Typography>
        {workout.exercises.map((exercise, index) => (
          <Typography key={index} variant="body2" color="textSecondary" component="p">
            {exercise.name}
          </Typography>
        ))}
      </CardContent>
    </Card>
  );
};

export default WorkoutCard;
