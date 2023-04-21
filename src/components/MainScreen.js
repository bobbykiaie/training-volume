import React, { useState, useEffect } from 'react';
import { Button, Typography, Collapse } from '@mui/material';
import CreateRoutineModal from './CreateRoutineModal';
import AddWorkoutModal from './AddWorkoutModal';
import WorkoutCard from './WorkoutCard';
import { db, auth } from '../firebase';
import { collection, onSnapshot, addDoc, updateDoc, doc, query, where } from 'firebase/firestore';
import { useNavigate, Navigate } from 'react-router-dom';

const MainScreen = ({ onWorkoutOpen, user }) => {
  const [showCreateRoutineModal, setShowCreateRoutineModal] = useState(false);
  const [showAddWorkoutModal, setShowAddWorkoutModal] = useState(false);
  const [currentRoutineIndex, setCurrentRoutineIndex] = useState(null);
  const [routines, setRoutines] = useState([]);
  const navigate = useNavigate();

  const handleClick = (workout) => {
    console.log(workout.name);
    onWorkoutOpen(workout);
  };
  


  const handleCreateRoutineClick = () => {
    setShowCreateRoutineModal(true);
  };

  const handleRoutineSave = async (routineName) => {
    const newRoutine = { name: routineName, workouts: [], uid: user.uid };

    const routineRef = await addDoc(collection(db, 'routines'), newRoutine);
    setRoutines([...routines, { id: routineRef.id, ...newRoutine }]);
  };

  const handleRoutineExpand = (index) => {
    setRoutines(routines.map((routine, i) => (i === index ? { ...routine, expanded: !routine.expanded } : routine)));
  };

  const handleAddWorkoutClick = (index) => {
    setShowAddWorkoutModal(true);
    setCurrentRoutineIndex(index);
  };

  const handleWorkoutSave = async (workout) => {
    const routineId = routines[currentRoutineIndex].id;
    const routineRef = doc(db, 'routines', routineId);
    const updatedWorkout = { ...workout, exercises: workout.exercises || [] };
    await updateDoc(routineRef, {
      workouts: [...routines[currentRoutineIndex].workouts, updatedWorkout]
    });
    setShowAddWorkoutModal(false);
  };
  
  
  useEffect(() => {
    if (user) {
      const userRoutinesCollection = collection(db, 'routines');
      const userRoutinesQuery = query(userRoutinesCollection, where('uid', '==', user.uid));
      const unsubscribe = onSnapshot(userRoutinesQuery, (snapshot) => {
        const fetchedRoutines = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setRoutines(fetchedRoutines);
        console.log(fetchedRoutines)
      });
      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/login');
    <Navigate to="/login" />
  }
  return (
    <div style={{ padding: '16px' }}>
      <Typography variant="h4" component="h2" style={{ marginBottom: '16px' }}>
        Start Workout
      </Typography>
     
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ borderRadius: 3, marginBottom: '16px' }}
        onClick={handleClick}
      >
        Start an empty workout
      </Button>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <Typography variant="h6" component="h3">
          Templates
        </Typography>
        <Button variant="contained" color="secondary" onClick={handleCreateRoutineClick}>
          Create Routine
        </Button>
      </div>
      {routines.map((routine, index) => (
        <div key={index}>
          <Button fullWidth onClick={() => handleRoutineExpand(index)}>
            <Typography variant="h6" component="h4">
              {routine.name}
            </Typography>
          </Button>
          <Collapse in={routine.expanded}>
            {routine.workouts.length === 0 ? (
              <Typography variant="body1" style={{ marginLeft: '16px', marginBottom: '8px' }}>
                No exercise days created yet.
              </Typography>
            ) : (
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  marginLeft: '16px',
                  marginBottom: '8px',
                }}>
                  {console.log(routine.workouts)}
                {routine.workouts.map((workout, workoutIndex) => (
                  
  <WorkoutCard
    key={workoutIndex}
    workout={workout}
    onWorkoutOpen={() => handleClick(workout)}
  />
   
 
))}

                </div>
              )}
              <Button
                variant="outlined"
                color="primary"
                sx={{ marginLeft: '16px', marginBottom: '8px' }}
                onClick={() => handleAddWorkoutClick(index)}
              >
                Add workout
              </Button>
          </Collapse>
        </div>
      ))}
      <CreateRoutineModal
        open={showCreateRoutineModal}
        onClose={() => setShowCreateRoutineModal(false)}
        onSave={handleRoutineSave}
      />
      <AddWorkoutModal
        open={showAddWorkoutModal}
        onClose={() => setShowAddWorkoutModal(false)}
        onSave={handleWorkoutSave}
        routines={routines}
        currentRoutineIndex={currentRoutineIndex}
      />
      <Button
        variant="outlined"
        color="secondary"
        sx={{ position: 'absolute', top: 10, right: 10 }}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>
  );
                  };  

    export default MainScreen;