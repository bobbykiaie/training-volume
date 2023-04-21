import React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';

const WorkoutCard = ({ workout, onWorkoutOpen }) => {
  return (
    <Button onClick={onWorkoutOpen} style={{ padding: 0, minWidth: 'calc(50% - 8px)', marginBottom: '16px' }}>
    <Card sx={{ minWidth: 275, marginBottom: '16px', flexGrow: 1, padding: '16px', marginLeft: '16px', marginRight: '16px' }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {workout.name}
        </Typography>
        {workout.exercises.map((exercise, index) => (
          <Typography key={index} variant="body2" component="p">
            {exercise.name.name} - {exercise.name.primary_muscle}
          </Typography>
        ))}
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onWorkoutOpen}>
          Open
        </Button>
      </CardActions>
    </Card>
    </Button>
  );
};

export default WorkoutCard;
