import { ThemeProvider, CssBaseline, Container } from '@mui/material';
import darkTheme from './theme';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuizPage from './pages/QuizPage.jsx';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz/:quizTopic" element={<QuizPage />} />
          </Routes>
        </Router>
      </Container>
    </ThemeProvider>
  );
}

export default App;
