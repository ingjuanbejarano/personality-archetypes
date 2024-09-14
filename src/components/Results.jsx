// src/components/Results.jsx
import React from 'react';
import { Typography, Container, Button } from '@mui/material';
import { jsPDF } from 'jspdf';
import archetypesDescriptions from '../constants/archetypesDescriptions.json'; // Importamos el JSON

const Results = ({ percentages, onRestart }) => {
  const predominantArchetype = Object.keys(percentages).reduce((a, b) =>
    percentages[a] > percentages[b] ? a : b
  );
  const archetypeDescription = archetypesDescriptions[predominantArchetype];

  // Función para generar el PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    let yOffset = 20; // Controla la posición vertical en el PDF
  
    // Mapeo para traducir los títulos de los rasgos
    const traitTitles = {
      openness: "Apertura a la Experiencia",
      responsibility: "Responsabilidad (Conciencia)",
      extraversion: "Extroversión",
      agreeableness: "Amabilidad",
      neuroticism: "Neuroticismo (Estabilidad Emocional)"
    };
  
    // Añadimos el título del arquetipo predominante
    doc.setFontSize(20);
    doc.text(archetypeDescription.title, 20, yOffset);
    yOffset += 10;
  
    // Añadimos las secciones detalladas del arquetipo
    doc.setFontSize(12);
  
    // Introducción
    doc.text("Introducción", 20, yOffset);
    yOffset += 10;
    const introLines = doc.splitTextToSize(archetypeDescription.description.introduction, 170);
    doc.text(introLines, 20, yOffset);
    yOffset += introLines.length * 5;
  
    // Salto de página si es necesario
    if (yOffset > 270) {
      doc.addPage();
      yOffset = 20;
    }
  
    // Fortalezas y Debilidades
    doc.text("Fortalezas y Debilidades", 20, yOffset);
    yOffset += 10;
  
    const strengths = doc.splitTextToSize(`Fortalezas: ${archetypeDescription.description.strengths_weaknesses.strengths}`, 170);
    doc.text(strengths, 20, yOffset);
    yOffset += strengths.length * 10;
  
    const weaknesses = doc.splitTextToSize(`Debilidades: ${archetypeDescription.description.strengths_weaknesses.weaknesses}`, 170);
    doc.text(weaknesses, 20, yOffset);
    yOffset += weaknesses.length * 10;
  
    // Salto de página si es necesario
    if (yOffset > 270) {
      doc.addPage();
      yOffset = 20;
    }
  
    // Propósito de Vida
    doc.text("Propósito de Vida", 20, yOffset);
    yOffset += 10;
  
    const lifePurpose = doc.splitTextToSize(archetypeDescription.description.life_purpose, 170);
    doc.text(lifePurpose, 20, yOffset);
    yOffset += lifePurpose.length * 8;
  
    // Salto de página si es necesario
    if (yOffset > 270) {
      doc.addPage();
      yOffset = 20;
    }
  
    // Añadimos los rasgos de personalidad con sus títulos en español
    doc.text("Los 5 Grandes Rasgos de la Personalidad", 20, yOffset);
    yOffset += 10;
  
    Object.keys(archetypeDescription.description.traits).forEach((traitKey) => {
      const translatedTitle = traitTitles[traitKey]; // Traducción del título
      const traitDescription = doc.splitTextToSize(`${translatedTitle}: ${archetypeDescription.description.traits[traitKey]}`, 170);
      doc.text(traitDescription, 20, yOffset);
      yOffset += traitDescription.length * 10;
  
      // Salto de página si es necesario
      if (yOffset > 270) {
        doc.addPage();
        yOffset = 20;
      }
    });
  
    // Guardar el PDF con el nombre del arquetipo
    doc.save(`${archetypeDescription.title}-resultados.pdf`);
  };
  

  return (
    <Container
      sx={{
        textAlign: 'center',
        paddingTop: '40px',
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: '20px', color: '#642c6b' }}>
        Resultados del Test de Arquetipos
      </Typography>

      <Typography variant="h6" sx={{ marginBottom: '10px' }}>
        Guerrero: {percentages.warrior.toFixed(2)}%
      </Typography>
      <Typography variant="h6" sx={{ marginBottom: '10px' }}>
        Amante: {percentages.lover.toFixed(2)}%
      </Typography>
      <Typography variant="h6" sx={{ marginBottom: '10px' }}>
        Sabio: {percentages.sage.toFixed(2)}%
      </Typography>
      <Typography variant="h6" sx={{ marginBottom: '10px' }}>
        Mago: {percentages.wizard.toFixed(2)}%
      </Typography>

      <Typography
        variant="h5"
        sx={{ marginTop: '20px', color: '#642c6b' }}
      >
        {archetypeDescription.title}
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: '20px' }}>
        {archetypeDescription.description.introduction}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={generatePDF}
        sx={{
          marginTop: '20px',
          backgroundColor: '#642c6b',
          '&:hover': {
            backgroundColor: '#531f57',
          },
        }}
      >
        Descarga este PDF para saber mas!
      </Button>

      <Button
        variant="contained"
        color="primary"
        onClick={onRestart}
        sx={{
          marginTop: '20px',
          backgroundColor: '#642c6b',
          '&:hover': {
            backgroundColor: '#531f57',
          },
        }}
      >
        Volver a empezar
      </Button>
    </Container>
  );
};

export default Results;
