import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { Grid, Paper, TextField, Button, Modal, Fade, Backdrop, Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, username, password);
      const user = auth.currentUser;
      onLogin(user.uid);
    } catch (error) {
      setError('Incorrect password');
    }
  };
  
  const [showRegisterModal, setShowRegisterModal] = useState(false);
const [name, setName] = useState('');
const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);


const handleRegister = async (event) => {
  event.preventDefault();
  const auth = getAuth();
  try {
    await createUserWithEmailAndPassword(auth, username, password);
    const user = auth.currentUser;
    onLogin(user.uid);
  } catch (error) {
    console.error('Error registering:', error.message);
  }
};


return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
      <Paper elevation={3} style={{ padding: '2rem' }}>
        <form onSubmit={handleSubmit}>
          <Grid container direction="column" spacing={2}>
            {error && (
              <Grid item>
                <p style={{ color: 'red' }}>{error}</p>
              </Grid>
            )}
            <Grid item>
              <TextField
                label="Email"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" type="submit">
                Login
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="text"
                color="primary"
                onClick={() => setShowRegisterModal(true)}
                style={{ textTransform: 'none' }}
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showRegisterModal}>
          <Paper elevation={3} style={{ padding: '2rem', width: '400px', margin: 'auto' }}>
            <form onSubmit={handleRegister}>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <TextField
                    label="Name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Email"
                    variant="outlined"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary" type="submit">
                    Register
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Fade>
      </Modal>
    </Grid>
  );
  
  
};

export default Login;
