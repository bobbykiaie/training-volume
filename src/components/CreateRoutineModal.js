// CreateRoutineModal.js
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton, TextField, Button, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const CreateRoutineModal = ({ open, onClose, onSave }) => {
  const [routineName, setRoutineName] = useState('');

  const handleSave = () => {
    onSave(routineName);
    setRoutineName('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
          Create Routine
        </Typography>
        <Button onClick={handleSave}>Save</Button>
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Routine Name"
          type="text"
          fullWidth
          value={routineName}
          onChange={(e) => setRoutineName(e.target.value)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateRoutineModal;
