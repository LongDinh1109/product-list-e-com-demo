import {
  Card as MUICard,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Rating,
} from "@mui/material";
import { styled } from "@mui/material/styles";

interface CardProps {
  title: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  onAddToCart?: () => void;
}

const StyledCard = styled(MUICard)({
  maxWidth: 345,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.02)",
  },
});

const Card = ({
  title,
  price,
  image,
  category,
  rating,
  onAddToCart,
}: CardProps) => {
  return (
    <StyledCard>
      <Box>
        <CardMedia
          component="img"
          height="200"
          width="fit-content"
          image={image}
          alt={title}
          sx={{ objectFit: "contain" }}
        />
      </Box>
      <CardContent
        sx={{
          alignItems: "start",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          <Rating name="read-only" value={rating} readOnly precision={0.5} />
        </Typography>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Typography gutterBottom variant="body2" color="text.secondary">
          {category}
        </Typography>
        <Typography variant="body1" color="text.primary">
          ${price.toFixed(2)}
        </Typography>
      </CardContent>
      <Box sx={{ p: 2 }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={onAddToCart}
        >
          Add to Cart
        </Button>
      </Box>
    </StyledCard>
  );
};

export default Card;
