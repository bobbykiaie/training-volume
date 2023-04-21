// AddExerciseModal.js
import React, { useState } from 'react';
import exerciseList from './exerciseList';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Autocomplete } from '@mui/lab';



const getExercisesList = (muscleGroup) => {
  if (muscleGroup) {
    return exerciseList.filter((exercise) => exercise.primary_muscle === muscleGroup);
  }
  return exerciseList;
};
const getUniqueMuscleGroups = () => {
  const muscleGroups = exerciseList.map((exercise) => exercise.primary_muscle);
  return [...new Set(muscleGroups)];
};



const AddExerciseModal = ({ open, onClose, onSave }) => {
  const [exerciseName, setExerciseName] = useState(null);
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState('');

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
        <FormControl fullWidth variant="standard" style={{ marginBottom: '16px' }}>
          <InputLabel>Muscle Group</InputLabel>
          <Select
            value={selectedMuscleGroup}
            onChange={(e) => setSelectedMuscleGroup(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {getUniqueMuscleGroups().map((muscleGroup, index) => (
  <MenuItem key={`${muscleGroup}-${index}`} value={muscleGroup}>
    {muscleGroup}
  </MenuItem>
))}


          </Select>
        </FormControl>
        <Autocomplete
  fullWidth
  options={getExercisesList(selectedMuscleGroup)}

  getOptionLabel={(option) => (option ? option.name : "")}
  value={exerciseName}
  onChange={(event, newValue) => {
    setExerciseName(newValue || null);
  }}
  renderInput={(params) => (
    <TextField {...params} label="Exercise Name" variant="standard" />
  )}
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

// import React, { useState } from 'react';
// import { Dialog, DialogTitle, DialogContent, TextField, Button } from '@mui/material';

// const AddExerciseModal = ({ open, onClose, onSave }) => {
//   const [exerciseName, setExerciseName] = useState('');
//   const [sets, setSets] = useState('');
//   const [reps, setReps] = useState('');

//   const handleSave = () => {
//     onSave({ name: exerciseName, sets, reps });
//     setExerciseName('');
//     setSets('');
//     setReps('');
//     onClose();
//   };

//   return (
//     <Dialog open={open} onClose={onClose}>
//       <DialogTitle>
//         Add Exercise
//         <Button color="primary" onClick={handleSave}>
//           Save
//         </Button>
//       </DialogTitle>
//       <DialogContent>
//         <TextField
//           fullWidth
//           label="Exercise Name"
//           value={exerciseName}
//           onChange={(e) => setExerciseName(e.target.value)}
//           variant="standard"
//         />
//         <TextField
//           fullWidth
//           label="Sets"
//           value={sets}
//           onChange={(e) => setSets(e.target.value)}
//           variant="standard"
//           style={{ marginTop: '16px' }}
//         />
//         <TextField
//           fullWidth
//           label="Reps"
//           value={reps}
//           onChange={(e) => setReps(e.target.value)}
//           variant="standard"
//           style={{ marginTop: '16px' }}
//         />
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default AddExerciseModal;
