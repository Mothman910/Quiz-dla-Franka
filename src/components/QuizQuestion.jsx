import { Box, Card, CardMedia, CardContent, Typography, Grid } from '@mui/material';
import PropTypes from 'prop-types';

const QuizQuestion = ({ question, onAnswer }) => {
  return (
    <Box>
      <Card sx={{ mb: 2, position: 'relative' }}>
        <CardMedia component="img" height="140" image={`/images/${question.category.toLowerCase()}_0.jpg`} alt={question.category} />
        <CardContent sx={{ position: 'absolute', top: 0, left: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <Typography variant="h6" sx={{ color: 'white' }}>
            {question.question}
          </Typography>
        </CardContent>
        <CardContent>
          <Grid container spacing={2}>
            {question.options.map((option, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card onClick={() => onAnswer(option === question.answer)} sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="h6">{option}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

QuizQuestion.propTypes = {
  question: PropTypes.shape({
    category: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    answer: PropTypes.string.isRequired,
  }).isRequired,
  onAnswer: PropTypes.func.isRequired,
};

export default QuizQuestion;
