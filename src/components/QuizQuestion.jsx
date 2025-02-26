import { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  CardActionArea,
} from '@mui/material';
import PropTypes from 'prop-types';
import Tilt from 'react-parallax-tilt';

const QuizQuestion = ({ question, onAnswer, selectedOption, reviewMode }) => {
  const [shuffledOptions, setShuffledOptions] = useState([]);

  useEffect(() => {
    setShuffledOptions(shuffleArray([...question.options]));
  }, [question]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleCardClick = (option) => {
    if (!reviewMode) {
      const isCorrect = option === question.answer;
      onAnswer(isCorrect, option);
    }
  };

  return (
    <Box>
      <Card sx={{ mb: 2, position: 'relative' }}>
        <CardMedia
          component="img"
          height="140"
          image={`/images/${question.category
            .toLowerCase()
            .replace(/ /g, '-')}_0.jpg`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `/images/${question.category.toLowerCase()}_0.png`;
          }}
          alt={question.category}
        />
        <CardContent
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          <Typography variant="h6" sx={{ color: 'white' }}>
            {question.question}
          </Typography>
        </CardContent>
        <CardContent>
          <Grid container spacing={2}>
            {shuffledOptions.map((option, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Tilt
                  glareEnable={true}
                  glareMaxOpacity={0.3}
                  glareColor="#ffffff"
                  glarePosition="bottom"
                  tiltMaxAngleX={15}
                  tiltMaxAngleY={15}
                  transitionSpeed={300}
                  scale={1.05}
                >
                  <Card
                    onClick={() => handleCardClick(option)}
                    sx={{
                      mb: 2,
                      backgroundColor:
                        reviewMode && option === selectedOption
                          ? option === question.answer
                            ? 'green'
                            : 'red'
                          : 'inherit',
                      border:
                        reviewMode && option === selectedOption
                          ? '2px solid'
                          : 'none',
                      borderColor:
                        reviewMode && option === selectedOption
                          ? option === question.answer
                            ? 'green'
                            : 'red'
                          : 'none',
                    }}
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        image={`/images/${option.toLowerCase()}.jpg`}
                        alt={option}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `/images/${option.toLowerCase()}.png`;
                        }}
                      />
                      <CardContent>
                        <Typography variant="h6">{option}</Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Tilt>
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
  selectedOption: PropTypes.string,
  reviewMode: PropTypes.bool,
};

export default QuizQuestion;
