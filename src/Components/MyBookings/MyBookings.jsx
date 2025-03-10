import {
    Box,
    Container,
    Stack,
    useTheme,
    Autocomplete,
    Button,
    TextField,
    InputAdornment,
    Typography
  } from "@mui/material";
  import NavBar from "../NavBar/NavBar";
  import SearchIcon from "@mui/icons-material/Search";
  import axios from "axios";
  import { NewContext } from "../../App";
  import { useSnackbar } from "notistack";
  import { useContext, useEffect, useState } from "react";
  import HospitalCard from "../HospitalCard/HospitalCard";
  import styles from  "./MyBookings.module.css"

  function MyBookings(){
    const theme = useTheme();
    const [BookingData, setBookingData] = useState([]);

    function getBookings(){
        const currData = JSON.parse(localStorage.getItem("bookings")) || [];
        setBookingData(currData);
    }

    useEffect(()=>{
        getBookings();
    }, []);

    return(
        <div>
              <NavBar />
              <Box
                sx={{
                  height: "110px",
                  background:
                    "linear-gradient(91.75deg, #2AA7FF 1.4%, #0C8CE6 100.57%)",
                  borderBottomLeftRadius: "16px",
                  borderBottomRightRadius: "16px",
                }}
              >
                <h1>My Bookings</h1>
              </Box>
              <Box>
                <Container className={styles.medicalCardSection} maxWidth= 'xl' fontFamily={theme.typography.fontFamily}>
                  {
                    BookingData.map((ele) => (
                      <HospitalCard hospitalName={ele['Hospital Name']} Address={ele.Address} rating={ele['Hospital overall rating']} showButton={false}/>
                    ))
                  }
                </Container>
              </Box>
            </div>
    )
  }

  export default MyBookings;