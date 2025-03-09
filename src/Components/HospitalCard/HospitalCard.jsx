import {
  Box,
  CardContent,
  CardMedia,
  Typography,
  useTheme,
} from "@mui/material";
import Card from "@mui/material/Card";
import styles from "./HospitalCard.module.css";
import hospitalIcon from "../../assets/div.u-pos-has.svg"

function HospitalCard() {
  const theme = useTheme();
  return (
    <Box display={"flex"} justifyContent={"center"}>
      <Card
        className={styles.card}
        variant="outlined"
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CardMedia className={styles.media} image={hospitalIcon} />
        <CardContent>
          <Typography typography={theme.typography.fontFamily}>
            Hospitals
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default HospitalCard;
