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
import styles from "./MedicalCenterPage.module.css";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { NewContext } from "../../App";
import { useSnackbar } from "notistack";
import { useContext, useEffect, useState } from "react";
import HospitalCard from "../HospitalCard/HospitalCard";

function MedicalCenterPage() {
  const theme = useTheme();

  const [selectedCity, setSelectedCity, selectedState, setSelectedState] = useContext(NewContext);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hospitals, setHospitals] = useState([]); 

  async function getStates() {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://meddata-backend.onrender.com/states"
      );
      setStates(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Check the backend server", error);
      setLoading(false);
    }
  }

  async function getCities(stateName) {
    if (!stateName) return;
    try {
      setLoading(true);
      const res = await axios.get(
        `https://meddata-backend.onrender.com/cities/${stateName}`
      );
      setCities(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Check the backend server", error);
      setLoading(false);
    }
  }

  async function getHospitals(){
    try {
      setLoading(true);
      const res = await axios.get(
        `https://meddata-backend.onrender.com/data?state=${selectedState}&city=${selectedCity}`
      );
      setHospitals(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Check the backend server", error);
      setLoading(false);
    }
  }

  useEffect(() => {
      getStates();
      getHospitals();
    }, []);
  
    useEffect(() => {
      if (selectedState) {
        getCities(selectedState);
      }
      else{
        setSelectedCity(null);
        setCities([]);
      }
    }, [selectedState]);

  return (
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
        <Container
          maxWidth="xl"
          style={{ background: "#FFFFFF", borderRadius: "15px" }}
          className={styles.search}
        >
          <Stack
            direction={"row"}
            display={"flex"}
            justifyContent={"space-between"}
            fontFamily={theme.typography.fontFamily}
            p={3}
          >
            <Autocomplete
                options={states}
                loading={loading}
              sx={{ width: 300 }}
                value={selectedState}
                onChange={(event, newValue) => {
                  setSelectedState(newValue);
                }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  slotProps={{
                    textField: {
                      InputProps: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      },
                    },
                  }}
                  placeholder="State"
                />
              )}
            />
            <Autocomplete
                options={cities}
                loading={loading}
              sx={{ width: 300 }}
                value={selectedCity}
                onChange={(event, newValue) => {
                  setSelectedCity(newValue);
                }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  slotProps={{
                    textField: {
                      InputProps: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      },
                    },
                  }}
                  placeholder="City"
                />
              )}
            />
            <Button variant="contained" size="large" startIcon={<SearchIcon />}>
              Search
            </Button>
          </Stack>
        </Container>
      </Box>
      <Box>
      <Container className={styles.medicalSection} maxWidth= 'xl' fontFamily={theme.typography.fontFamily}>
          <Typography>{`${hospitals.length} medical centers available in ${selectedCity}`}</Typography>
        </Container>
        <Container className={styles.medicalCardSection} maxWidth= 'xl' fontFamily={theme.typography.fontFamily}>
          {
            hospitals.map((ele) => (
              <HospitalCard />
            ))
          }
        </Container>
      </Box>
    </div>
  );
}

export default MedicalCenterPage;
