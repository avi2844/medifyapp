import {
  Box,
  CardContent,
  CardMedia,
  Typography,
  useTheme,
  Button
} from "@mui/material";
import Card from "@mui/material/Card";
import styles from "./HospitalCard.module.css";
import hospitalIcon from "../../assets/div.u-pos-has.svg"
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import BookingSelection from "../BookingSelection/BookingSelection";
import { useState } from "react";

function HospitalCard({hospitalName, Address, City, rating, showButton}) {
  const theme = useTheme();
  const [showSelection, setShowSelection] = useState(false);

  return (
    <Box display={"flex"} justifyContent={"center"}>
      <Card
        className={styles.card}
        variant="outlined"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: 'column'
        }}
      >
        <CardMedia className={styles.media} image={hospitalIcon} />
        <CardContent>
          <h3 typography={theme.typography.fontFamily}>
           {hospitalName}
          </h3>
          <Typography>
            {Address}, {City}
          </Typography>
          <Box sx={{
            width: '44px',
            height: '22px',
            borderRadius: '3.5px',
            background: '#00A500'
          }}>
            <ThumbUpIcon sx={{ fontSize: 16, color: "white", verticalAlign: "middle", paddingLeft: '5px'}} /> {rating}
          </Box>
          {
            (showButton) ? <Button variant="contained" size="large" onClick={() => {setShowSelection((prev) => !prev)}}> 
            Book FREE Center Visit
          </Button> : null
          }
        </CardContent>
        {(showSelection) ? <BookingSelection hospitalName={hospitalName} Address={Address} City={City} rating={rating} /> : null}
      </Card>
    </Box>
  );
}

export default HospitalCard;
