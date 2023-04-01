import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, Typography } from '@mui/material';
import AddExerciseModal from './AddExerciseModal';
import db from '../firebase';
import { collection, onSnapshot, addDoc, updateDoc, doc } from 'firebase/firestore';


const AddWorkoutModal = ({ open, onClose, onSave, routines,currentRoutineIndex }) => {
  const [workoutName, setWorkoutName] = useState('');
  const [exercises, setExercises] = useState([]);
  const [showAddExerciseModal, setShowAddExerciseModal] = useState(false);

  // AddWorkoutModal.js
  const handleSave = async () => {
    if (workoutName.trim() === '' || exercises.length === 0) {
      alert('Please enter a workout name and add at least one exercise.');
      return;
    }
  
    const newWorkoutRef = await addDoc(collection(db, 'routines', routines[currentRoutineIndex].id, 'workouts'), {
      name: workoutName,
      exercises: exercises
    });
    onSave({ id: newWorkoutRef.id, name: workoutName, exercises });
    setWorkoutName('');
    setExercises([]);
    onClose();
  };
  

  const handleAddExerciseSave = (exercise) => {
    setExercises([...exercises, exercise]);
  };

  return (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>
            <Button color="primary" onClick={onClose}>
                X
            </Button>
            Add Workout
            <Button color="primary" onClick={handleSave}>
                Save
            </Button>
        </DialogTitle>
        <DialogContent>
            <TextField
                fullWidth
                label="Workout Name"
                value={workoutName}
                onChange={(e) => setWorkoutName(e.target.value)}
                variant="standard"
            />
            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => setShowAddExerciseModal(true)}
                style={{ marginTop: '16px' }}
            >
                Add Exercises
            </Button>
            {exercises.map((exercise, index) => (
                <div key={index}>
                    <Typography variant="h6">{exercise.name}</Typography>
                    <Typography variant="body1">
                        {exercise.sets} sets x {exercise.reps} reps
                    </Typography>
                </div>
            ))}
            <AddExerciseModal
                open={showAddExerciseModal}
                onClose={() => setShowAddExerciseModal(false)}
                onSave={handleAddExerciseSave}
            />
        </DialogContent>
    </Dialog>
);
};

export default AddWorkoutModal;