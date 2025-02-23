import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';
import PropTypes from 'prop-types';

function QuizCard({ title, image, onClick }) {
  return (
    <Card onClick={onClick} sx={{ minWidth: 200, maxWidth: 400, bgcolor: 'background.paper' }}>
      <CardActionArea>
        <CardMedia component="img" height="140" image={image} alt={title} />
        <CardContent>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

QuizCard.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default QuizCard;
