import React, { useContext, useEffect, useRef, useState } from "react";
import { SwipeableDrawer } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import WorkoutContext from "../context";
import exerciseList from "./exerciseList"; // Import exerciseList

const StyledSwipeableDrawer = styled(SwipeableDrawer)({
  "& .MuiDrawer-paper": {
    height: "calc(100% - 56px)",
    top: 56,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
});

const Workout = ({
  onClose,
  onEndWorkout,
  workout = { name: "None", exercises: [] },
}) => {
  const { elapsedTime, setElapsedTime } = useContext(WorkoutContext);
  const startTimeRef = useRef(Date.now());
  const [exerciseSets, setExerciseSets] = useState(
    workout.exercises.map((exercise) => [{ weight: "", reps: "" }])
  );

  const [muscleSets, setMuscleSets] = useState(() => {
    const initialMuscleSets = {};
    workout.exercises.forEach((exercise) => {
      const muscle = exercise.name.primary_muscle;
      initialMuscleSets[muscle] = (initialMuscleSets[muscle] || 0) + 1;
    });
    return initialMuscleSets;
  });

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
    setElapsedTime(0);
    startTimeRef.current = Date.now();
  };

  const formatTime = (time) => {
    const date = new Date(time);
    return date.toISOString().substr(11, 8);
  };

  const addSet = (exerciseIndex) => {
    setExerciseSets((prevSets) => {
      const newSets = [...prevSets];
      newSets[exerciseIndex] = [...newSets[exerciseIndex], { weight: "", reps: "" }];
      return newSets;
    });

    const muscle = workout.exercises[exerciseIndex].name.primary_muscle;
    setMuscleSets((prevSets) => ({ ...prevSets, [muscle]: prevSets[muscle] + 1 }));
  };

  return (
    <StyledSwipeableDrawer anchor="bottom" open={true} onClose={handleMinimize}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "16px",
        }}
      >
        <div
          style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}
        >
          {workout.name}
        </div>
        {workout.exercises.map((exercise, index) => (
          <div key={index}>
            <div style={{ fontSize: "16px", marginBottom: "8px" }}>
              {exercise.name.name} - {exercise.name.primary_muscle}
            </div>
            {exerciseSets[index].map((set, setIndex) => (
              <div key={setIndex} style={{ display: "flex", marginBottom: "8px" }}>
                <TextField
                  label="Weight"
                  value={set.weight}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    setExerciseSets((prevSets) => {
                      const newSets = [...prevSets];
                      newSets[index][setIndex].weight = newValue;
                      return newSets;
                    });
                  }}
                  style={{ marginRight: "8px" }}
                />
                <TextField
                  label="Reps"
                  value={set.reps}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    setExerciseSets((prevSets) => {
                      const newSets = [...prevSets];
                      newSets[index][setIndex].reps = newValue;
                      return newSets;
                    });
                  }}
                />
              </div>
            ))}
            <Button
              size="small"
              color="primary"
              onClick={() => addSet(index)}
              style={{ marginBottom: "16px" }}
            >
              Add Set
            </Button>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", marginBottom: "16px" }}>
          {Object.entries(muscleSets).map(([muscle, count], index) => (
            <div key={index} style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "8px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "50%",
                  backgroundColor: "#f50057",
                  width: "48px",
                  height: "48px",
                  color: "white",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                {count}
              </div>
              <div style={{ fontSize: "14px", marginTop: "4px" }}>{muscle}</div>
            </div>
          ))}
        </div>
        <div
          style={{ fontSize: "48px", fontWeight: "bold", marginBottom: "16px" }}
        >
          {formatTime(elapsedTime)}
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleEndWorkout}
          style={{ marginBottom: "16px" }}
        >
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
