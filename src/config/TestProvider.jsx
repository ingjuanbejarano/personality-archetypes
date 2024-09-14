// src/config/TestProvider.jsx
import React, { createContext, useState } from 'react';
import questions from '../constants/questions.json'; // Importamos el JSON de preguntas

// Creación del contexto
const TestContext = createContext();

const TestProvider = ({ children }) => {
  const [isTestStarted, setIsTestStarted] = useState(false); // Si el test ha comenzado
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Índice de la pregunta actual
  const [answers, setAnswers] = useState([]); // Respuestas seleccionadas
  const [results, setResults] = useState({
    warrior: 0,
    lover: 0,
    sage: 0,
    wizard: 0,
  }); // Estado para almacenar los resultados por arquetipo

  const [isTestFinished, setIsTestFinished] = useState(false); // Estado para saber si el test ha terminado

  // Método para iniciar el test
  const startTest = () => {
    setIsTestStarted(true);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setResults({
      warrior: 0,
      lover: 0,
      sage: 0,
      wizard: 0,
    }); // Resetear los resultados
    setIsTestFinished(false); // Resetear el estado del test finalizado
  };

  // Método para avanzar a la siguiente pregunta
  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsTestFinished(true);
    }
  };

  // Método para guardar una respuesta y sumar el peso al arquetipo correspondiente
  const saveAnswer = (question, selectedOption) => {
    const { archetype, value } = selectedOption.weight;
    setAnswers((prevAnswers) => [...prevAnswers, { question, selectedOption }]); // Agrega la respuesta al array
    setResults((prevResults) => ({
      ...prevResults,
      [archetype]: prevResults[archetype] + value, // Sumar el valor al arquetipo correspondiente
    }));
  };

  // Método para calcular los porcentajes finales
  const calculatePercentages = () => {
    const totalValues = results.warrior + results.lover + results.sage + results.wizard;
    if (totalValues === 0) return results; // Evitar división por 0

    return {
      warrior: (results.warrior / totalValues) * 100,
      lover: (results.lover / totalValues) * 100,
      sage: (results.sage / totalValues) * 100,
      wizard: (results.wizard / totalValues) * 100,
    };
  };

  return (
    <TestContext.Provider
      value={{
        isTestStarted,
        currentQuestionIndex,
        answers,
        startTest,
        nextQuestion,
        saveAnswer,
        questions,
        isTestFinished,
        calculatePercentages, // Método para obtener los porcentajes
      }}
    >
      {children}
    </TestContext.Provider>
  );
};

export { TestContext, TestProvider };
