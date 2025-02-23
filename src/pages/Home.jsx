import { useState } from 'react';
import { Dialog, DialogContent, Grid2, Typography, Slide } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import QuizCard from '../components/QuizCard';
import StorySlides from '../components/StorySlides';

const quizzes = [
  {
    id: 1,
    title: 'Minecraft',
    image: '/images/minecraft_0.png',
    story: [
      { id: 1, text: 'Pewnego razu w magicznym lesie… 🌲' },
      { id: 2, text: 'Nagle pojawił się smok! 🐉' },
      { id: 3, text: 'Bohater musiał podjąć decyzję… 🏹' },
    ],
  },
  {
    id: 2,
    title: 'Lego',
    image: '/images/lego_0.jpg',
    story: [
      { id: 1, text: 'Budowanie zaczyna się od małego klocka… 🧱' },
      { id: 2, text: 'Nagle pojawił się wielki zamek! 🏰' },
      { id: 3, text: 'Co zbudujesz dalej? 🚀' },
    ],
  },
  {
    id: 3,
    title: 'Sonic',
    image: '/images/sonic_0.jpg',
    story: [
      { id: 1, text: 'Sonic biegł przez zielone wzgórza… 🏞️' },
      { id: 2, text: 'Nagle pojawił się Dr. Robotnik! 🦹‍♂️' },
      { id: 3, text: 'Sonic musi uratować przyjaciół… 🦔' },
    ],
  },
  {
    id: 4,
    title: 'Pokemon',
    image: '/images/pokemon_0.jpg',
    story: [
      { id: 1, text: 'Trener wyruszył na poszukiwanie Pokemonów… 🎒' },
      { id: 2, text: 'Nagle pojawił się Pikachu! ⚡' },
      { id: 3, text: 'Czas na pojedynek! ⚔️' },
    ],
  },
  {
    id: 5,
    title: 'Jurassic Park',
    image: '/images/jurassic-park_0.jpg',
    story: [
      { id: 1, text: 'W parku pojawiły się dinozaury… 🦕' },
      { id: 2, text: 'Nagle pojawił się T-Rex! 🦖' },
      { id: 3, text: 'Musisz uciekać! 🏃‍♂️' },
    ],
  },
  {
    id: 6,
    title: 'Star Wars',
    image: '/images/star-wars_0.jpg',
    story: [
      { id: 1, text: 'W odległej galaktyce… 🌌' },
      { id: 2, text: 'Nagle pojawił się Darth Vader! 🦹‍♂️' },
      { id: 3, text: 'Czas na walkę mieczami świetlnymi! ⚔️' },
    ],
  },
];

function Home() {
  const [open, setOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const navigate = useNavigate();

  const handleOpen = (quiz) => {
    setSelectedQuiz(quiz);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleStartQuiz = () => {
    if (selectedQuiz) {
      setOpen(false); // Zamknij pop-up
      navigate(`/quiz/${selectedQuiz.title.toLowerCase()}`); // Przekierowanie do quizu
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '30px' }}>
      <Typography variant="h4" gutterBottom>
        Wybierz Quiz
      </Typography>
      <Grid2 container spacing={3} justifyContent="center">
        {quizzes.map((quiz) => (
          <Grid2 item key={quiz.id}>
            <QuizCard title={quiz.title} image={quiz.image} onClick={() => handleOpen(quiz)} />
          </Grid2>
        ))}
      </Grid2>

      {/* Pop-up z animacją Slide */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" slots={{ transition: Slide }} slotProps={{ transition: { direction: 'up' } }}>
        <DialogContent>{selectedQuiz && <StorySlides story={selectedQuiz.story} onFinish={handleClose} onStartQuiz={handleStartQuiz} />}</DialogContent>
      </Dialog>
    </div>
  );
}

export default Home;
