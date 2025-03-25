import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import {
  List,
  ListItem,
  ListItemText,
  Checkbox,
  TextField,
  Button,
  IconButton,
  ListItemSecondaryAction,
  Paper,
  Box,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

const GET_TODOS = gql`
  query {
    todos {
      id
      title
      description
      completed
    }
  }
`;

const CREATE_TODO = gql`
  mutation CreateTodo($title: String!, $description: String) {
    createTodo(createTodoInput: { title: $title, description: $description }) {
      id
      title
      description
      completed
    }
  }
`;

const TOGGLE_TODO = gql`
  mutation ToggleTodo($id: ID!) {
    toggleTodo(id: $id) {
      id
      completed
    }
  }
`;

const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id)
  }
`;

export const Todos = () => {
  const { loading, error, data, refetch } = useQuery(GET_TODOS);
  const [createTodo] = useMutation(CREATE_TODO);
  const [toggleTodo] = useMutation(TOGGLE_TODO);
  const [deleteTodo] = useMutation(DELETE_TODO);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createTodo({ variables: { title, description } });
    setTitle('');
    setDescription('');
    refetch();
  };

  const handleToggle = async (id: string) => {
    await toggleTodo({ variables: { id } });
    refetch();
  };

  const handleDelete = async (id: string) => {
    await deleteTodo({ variables: { id } });
    refetch();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Add Todo
        </Button>
      </Box>

      <List>
        {data?.todos?.map((todo: any) => (
          <ListItem key={todo.id} divider>
            <Checkbox
              checked={todo.completed}
              onChange={() => handleToggle(todo.id)}
            />
            <ListItemText
              primary={todo.title}
              secondary={todo.description}
              sx={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => handleDelete(todo.id)}>
                <DeleteIcon color="error" />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};