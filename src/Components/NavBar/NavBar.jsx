import { Box, Container, useTheme, Stack, Button } from "@mui/material";
import LogoSvg from "../../assets/med-logo.svg"

export default function NavBar() {
  const theme = useTheme();
  return (
    <nav>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          height: "40px",
        }}
        bgcolor={theme.palette.primary.main}
        fontFamily={theme.typography.fontFamily}
        fontSize={14}
        p={1}
      >
        The health and well-being of our patients and their health care team
        will always be our priority, so we follow the best practices for
        cleanliness.
      </Box>
      <Container maxWidth="xl">
      <Stack direction="row" display={"flex"} justifyContent={"space-between"} fontFamily={theme.typography.fontFamily} py={2}>
        <Box>
            <img src={LogoSvg} height={27}/>
        </Box>
        <Stack direction="row" spacing={10} alignItems={"center"} justifyItems={"center"} >
        <Box>Find Doctors</Box>
        <Box>Hospitals</Box>
        <Box>Medicines</Box>
        <Box>Surgeries</Box>
        <Box>Software for Provider</Box>
        <Box>Facilities</Box>
        <Button variant="contained">My Bookings</Button>
        </Stack>    
      </Stack>
      </Container>
    </nav>
  );
}
