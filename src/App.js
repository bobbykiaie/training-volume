// import React, { useState } from 'react';
// import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
// import Login from './components/Login';
// import MainScreen from './components/MainScreen';
// import ChartScreen from './components/ChartScreen';
// import BottomNavigationTabs from './components/BottomNavigationTabs';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { auth } from './firebase';

// const App = () => {
//   const [user] = useAuthState(auth);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [tabValue, setTabValue] = useState(0);
//   const [workoutTimes, setWorkoutTimes] = useState([]);

//   const handleLogin = () => {
//     setIsLoggedIn(true);
//   };

//   const handleTabChange = (event, newValue) => {
//     setTabValue(newValue);
//   };

//   const addWorkoutTime = (time) => {
//     setWorkoutTimes([...workoutTimes, time]);
//   };

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
//         <Route
//           path="/"
//           element={
//             isLoggedIn ? (
//               <BottomNavigationTabs addWorkoutTime={addWorkoutTime} workoutTimes={workoutTimes} user={user} />
//             ) : (
//               <Navigate to="/login" />
//             )
//           }
//         />
//         <Route path="/chart" element={<ChartScreen workoutTimes={workoutTimes} />} />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import MainScreen from './components/MainScreen';
import ChartScreen from './components/ChartScreen';
import BottomNavigationTabs from './components/BottomNavigationTabs';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';

const App = () => {
  const [user, loading, error] = useAuthState(auth);
  const [tabValue, setTabValue] = useState(0);
  const [workoutTimes, setWorkoutTimes] = useState([]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const addWorkoutTime = (time) => {
    setWorkoutTimes([...workoutTimes, time]);
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/" element={user ? <BottomNavigationTabs addWorkoutTime={addWorkoutTime} workoutTimes={workoutTimes} user={user} /> : <Navigate to="/login" />} />
        <Route path="/chart" element={<ChartScreen workoutTimes={workoutTimes} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
