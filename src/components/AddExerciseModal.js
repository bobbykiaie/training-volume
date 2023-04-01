import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button } from '@mui/material';

const AddExerciseModal = ({ open, onClose, onSave }) => {
  const [exerciseName, setExerciseName] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');

  const handleSave = () => {
    onSave({ name: exerciseName, sets, reps });
    setExerciseName('');
    setSets('');
    setReps('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Add Exercise
        <Button color="primary" onClick={handleSave}>
          Save
        </Button>
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Exercise Name"
          value={exerciseName}
          onChange={(e) => setExerciseName(e.target.value)}
          variant="standard"
        />
        <TextField
          fullWidth
          label="Sets"
          value={sets}
          onChange={(e) => setSets(e.target.value)}
          variant="standard"
          style={{ marginTop: '16px' }}
        />
        <TextField
          fullWidth
          label="Reps"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          variant="standard"
          style={{ marginTop: '16px' }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddExerciseModal;
