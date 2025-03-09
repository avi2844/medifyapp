import { Box, Container, Stack, Typography, useTheme, Button} from "@mui/material";
import docImage from "../../assets/hero_image.svg";


function HeroSection(){
    const theme = useTheme();
    return (
        <Container maxWidth="xl" >
        <Stack direction="row">
            <Box pt={10}>
            <Typography typography={theme.typography.fontFamily} fontWeight={500} fontSize={'31px'}>Skip the travel! Find Online</Typography>
            <Typography typography={theme.typography.fontFamily} fontWeight={700} fontSize={'56px'}>Medical <span style={{color : '#2AA7FF'}}>Centers</span></Typography>
            <Typography typography={theme.typography.fontFamily} fontWeight={400} fontSize={'20px'} color="#5C6169">Connect instantly with a 24x7 specialist or choose to video visit a particular doctor.</Typography>
            <Box pt={5}><Button variant="contained" size="large">Find Centers</Button></Box>
            </Box>
            <Box pl={20}>
            <img src={docImage} alt="hero-image"/>
            </Box>
        </Stack>
        </Container>
        
    )
}

export default HeroSection;