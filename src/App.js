import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import HomePage from './components/HomePage';
import ShowDetailScreen from './components/ShowDetailScreen';

const theme = {
  backgroundColor: '#f4f4f9',
  primaryColor: '#2196f3',
  secondaryColor: '#ff9800',
  accentColor: '#4caf50',
  textColor: '#212121',
  cardBackgroundColor: '#fff',
  cardShadowColor: 'rgba(0, 0, 0, 0.1)',
  hoverTransform: 'translateY(-5px)',
  transitionDuration: '0.3s',
  headerBackgroundColor: '#2196f3',
  footerBackgroundColor: '#2196f3',
  inputBackgroundColor: '#e3f2fd',
  inputTextColor: '#212121',
  fontFamily: "'Roboto', sans-serif",
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/show/:showId" element={<ShowDetailScreen />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
