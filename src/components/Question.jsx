import React from 'react';
import { Typography, Button, Box, Container } from '@mui/material';

const Question = ({ question, handleAnswerClick }) => {
  return (
    <Container
      sx={{
        backgroundColor: '#eae1ea', // Fondo lavanda pálido
        padding: '20px',
        borderRadius: '8px',
        width: '100%', // Full width for responsiveness
        maxWidth: '800px', // Still sets a maximum width for larger screens
        margin: '20px auto',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Sombra ligera
      }}
    >
      <Typography
        variant="h5"
        sx={{ color: '#642c6b', marginBottom: '20px', textAlign: 'center' }} // Texto lavanda
      >
        {question.description}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        {question.options.map((option, index) => (
          <Button
            key={index}
            variant="outlined"
            color="primary"
            onClick={() => handleAnswerClick(option)}
            sx={{
              padding: '10px',
              fontSize: '16px',
              backgroundColor: '#fff', // Fondo blanco para el botón
              borderColor: '#642c6b',
              color: '#642c6b', // Lavanda para el texto y el borde
              '&:hover': {
                backgroundColor: '#f0f0f0',
              },
            }}
          >
            {option.label}
          </Button>
        ))}
      </Box>
    </Container>
  );
};

export default Question;
