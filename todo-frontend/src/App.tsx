import React from 'react';
import { Todos } from './components/Todos';
import { Container, Typography } from '@mui/material';

function App() {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Todo App
      </Typography>
      <Todos />
    </Container>
  );
}

export default App;