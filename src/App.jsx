// src/App.jsx
import React, { useContext } from 'react';
import { Button, Typography, Container, Box } from '@mui/material';
import { TestContext } from './config/TestProvider';
import logo from './assets/logopneuma_png_Mesa de trabajo 1.png'; // Ruta al logo
import Question from './components/Question'; // Importamos el nuevo componente de preguntas
import Results from './components/Results'; // Importamos el nuevo componente de resultados

const App = () => {
  const {
    isTestStarted,
    isTestFinished,
    questions,
    currentQuestionIndex,
    startTest,
    nextQuestion,
    saveAnswer,
    calculatePercentages, // Importar el método para calcular porcentajes
  } = useContext(TestContext);

  const handleAnswerClick = (selectedOption) => {
    const currentQuestion = questions[currentQuestionIndex];
    saveAnswer(currentQuestion, selectedOption);
    nextQuestion();
  };

  // Página inicial antes de comenzar el test
  if (!isTestStarted) {
    return (
      <Container
        maxWidth={false}
        sx={{
          maxWidth: '1440px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          backgroundColor: '#e5e5e5', // Gris claro para el fondo
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="Logo Pneuma"
          sx={{
            width: { xs: '80%', sm: '60%', md: '40%' }, // Responsivo para diferentes tamaños de pantalla
            maxWidth: '400px', // Tamaño máximo del logo
            marginBottom: '20px',
          }}
        />
        <Typography
          variant="h4"
          sx={{ color: '#642c6b', marginBottom: '20px' }} // Lavanda para el texto
        >
          Bienvenido al Test de Arquetipos
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={startTest}
          sx={{
            padding: '10px 20px',
            fontSize: '18px',
            backgroundColor: '#642c6b', // Lavanda para el botón
            '&:hover': {
              backgroundColor: '#531f57', // Color más oscuro en hover
            },
          }}
        >
          Comenzar Test
        </Button>
      </Container>
    );
  }

  // Cuando el test ha finalizado, mostramos los resultados
  if (isTestFinished) {
    const percentages = calculatePercentages();
    return <Results percentages={percentages} onRestart={startTest} />;
  }

  // Cuando el test ha comenzado pero no ha terminado
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Container>
      <Question question={currentQuestion} handleAnswerClick={handleAnswerClick} />
    </Container>
  );
};

export default App;
