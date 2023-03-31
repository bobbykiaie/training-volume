import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import MainScreen from './components/MainScreen';
import ChartScreen from './components/ChartScreen';
import BottomNavigationTabs from './components/BottomNavigationTabs';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [workoutTimes, setWorkoutTimes] = useState([]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const addWorkoutTime = (time) => {
    setWorkoutTimes([...workoutTimes, time]);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <BottomNavigationTabs addWorkoutTime={addWorkoutTime} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/chart" element={<ChartScreen workoutTimes={workoutTimes} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
