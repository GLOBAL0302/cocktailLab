import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import type { ICocktail } from '../../types';
import { apiUrl } from '../../Constants';
import Rating from '@mui/material/Rating';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface Props {
  cocktail: ICocktail;
  showMyCocktail?: boolean;
}

const Cocktail: React.FC<Props> = ({ cocktail, showMyCocktail }) => {
  const [modal, setModal] = useState<boolean>(false);
  const [value, setValue] = useState<number | null>(0);
  let image;
  const ratingSum = cocktail.ratings.reduce((sum, item) => sum + item.rating, 0) / cocktail.ratings.length;

  if (cocktail.image) {
    image = apiUrl + '/' + cocktail.image;
  }

  const openModal = () => {
    setModal(true);
  };

  const closeModal = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setModal(false);
  };
  return (
    <Card sx={{ width: '20rem' }} onClick={() => openModal()} className="relative">
      <CardMedia sx={{ height: 140 }} image={image} title={cocktail.title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="p" className="h-20">
          {cocktail.title}
        </Typography>
        <Box component="div" className="flex">
          {showMyCocktail && !cocktail.isPublished && (
            <p className="p-1 bg-black w-fit capitalize text-white rounded-2xl absolute top-1 left-1">
              reviewing..
              <VisibilityIcon color="inherit" />
            </p>
          )}
          {showMyCocktail && (
            <Box component="div" className="absolute bottom-2 right-1">
              <Button variant="outlined" color="error" startIcon={<DeleteIcon />}>
                delete
              </Button>
            </Box>
          )}
        </Box>

        <Rating name="no-value" value={ratingSum} precision={0.5} />
      </CardContent>
      <Modal
        open={modal}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box component="div" className="flex gap-6">
            <Box component="div">
              <img src={image} />
            </Box>
            <Box component="div">
              <p className="font-extrabold underline text-2xl">{cocktail.title}</p>
              <p className="text-xl">ratings</p>
              <p className="font-extrabold uppercase">ingredients:</p>
              <ul className="list-disc">
                {cocktail.ingredients.map((ingredient) => (
                  <li key={ingredient._id}>
                    <span>{ingredient.title}</span> <span>{ingredient.amount}</span>
                  </li>
                ))}
              </ul>
              <p className="uppercase font-extrabold">recipe</p>
              <p className="text-slate-700">{cocktail.receipt}</p>
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(_event, newValue) => {
                  setValue(newValue);
                }}
              />
            </Box>
          </Box>
        </Box>
      </Modal>
    </Card>
  );
};

export default Cocktail;
