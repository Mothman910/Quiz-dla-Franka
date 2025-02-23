import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Box, Typography, Dialog, DialogContent, LinearProgress, Button, Grid } from '@mui/material';
import questionsData from '../data/questions.json';
import QuizQuestion from '../components/QuizQuestion';

const QuizPage = () => {
  const { quizTopic } = useParams();
  const capitalizedQuizTopic = quizTopic.charAt(0).toUpperCase() + quizTopic.slice(1);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [open, setOpen] = useState(true);
  const [answers, setAnswers] = useState([]);
  const [reviewMode, setReviewMode] = useState(false);

  useEffect(() => {
    const filteredQuestions = questionsData.filter((q) => q.category.toLowerCase() === quizTopic.toLowerCase());
    const shuffledQuestions = filteredQuestions.sort(() => 0.5 - Math.random()).slice(0, 5);
    setQuestions(shuffledQuestions);
  }, [quizTopic]);

  const handleAnswer = (isCorrect, selectedOption) => {
    setAnswers([...answers, { question: questions[currentQuestionIndex], selectedOption, isCorrect }]);
    if (isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizFinished(true);
      setOpen(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setReviewMode(false);
  };

  const handleReopen = (index) => {
    setCurrentQuestionIndex(index);
    setReviewMode(true);
    setOpen(true);
  };

  return (
    <Box>
      <Typography paddingTop="20px" align="center" variant="h4">
        Quiz: {capitalizedQuizTopic}
      </Typography>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogContent>
          {!quizFinished || reviewMode ? (
            <>
              <QuizQuestion question={questions[currentQuestionIndex]} onAnswer={(isCorrect, selectedOption) => handleAnswer(isCorrect, selectedOption)} selectedOption={answers[currentQuestionIndex]?.selectedOption} reviewMode={reviewMode} />
              <LinearProgress variant="determinate" value={((currentQuestionIndex + 1) / questions.length) * 100} />
            </>
          ) : (
            <Typography variant="h6">
              Liczba poprawnych odpowiedzi: {correctAnswers} z {questions.length}
            </Typography>
          )}
        </DialogContent>
      </Dialog>
      {quizFinished && (
        <Grid container spacing={2} justifyContent="center" sx={{ mt: 3 }}>
          {answers.map((answer, index) => (
            <Grid item key={index}>
              <Button variant="contained" color={answer.isCorrect ? 'success' : 'error'} onClick={() => handleReopen(index)}>
                Pytanie {index + 1}
              </Button>
            </Grid>
          ))}
        </Grid>
      )}
      <Box textAlign="center" sx={{ mt: 3 }}>
        <Button variant="contained" color="primary" component={Link} to="/">
          Powrót do strony głównej
        </Button>
      </Box>
    </Box>
  );
};

export default QuizPage;
