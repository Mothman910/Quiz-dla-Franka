import { useState } from 'react';
import { Box, Typography, Button, Fade } from '@mui/material';
import PropTypes from 'prop-types';

const StorySlides = ({ onStartQuiz, story, onFinish }) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const handleNext = () => {
    setFade(false);
    setTimeout(() => {
      if (pageIndex < story.length - 1) {
        setPageIndex((prev) => prev + 1);
        setFade(true);
      } else {
        onFinish();
        onStartQuiz();
      }
    }, 300);
  };

  return (
    <Box textAlign="center" p={3}>
      <Fade in={fade} timeout={300}>
        <Typography variant="h5">{story[pageIndex].text}</Typography>
      </Fade>
      <Button variant="contained" color="primary" onClick={handleNext} sx={{ mt: 3 }}>
        {pageIndex < story.length - 1 ? 'Dalej' : 'Start Quizu'}
      </Button>
    </Box>
  );
};

StorySlides.propTypes = {
  onFinish: PropTypes.func.isRequired,
  story: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
  onStartQuiz: PropTypes.func.isRequired,
};

export default StorySlides;
